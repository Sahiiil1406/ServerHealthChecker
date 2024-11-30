const cron = require('node-cron');
const { Task } = require('./models/task');
const axios=require('axios');

const healthCheckCron = async () => {
    console.log('Health Check Cron is running');
    
    const time = process.env.CRON_TIME || 20;
    
    cron.schedule(`*/${time} * * * * *`, async () => {
        try {
            const tasks = await Task.find({});
            
            const healthCheckPromises = tasks.map(async (task) => {
                try {
    
                    const response = await axios.get(task.url, {
                        timeout: 5000, // 5 seconds timeout
                        validateStatus: (status) => status >= 200 && status < 300 // Consider 2xx statuses as success
                    });
                    task.status = 'alive';
                    task.lastAlive = Date.now();
                    console.log(`Health check for ${task.url} is good`);
                } catch (error) {
                    task.status = 'dead';
                    task.lastDead = Date.now();
                    console.error(`Health check failed for ${task.url}:`, {
                        message: error.message,
                        code: error.code,
                        status: error.response?.status
                    });
                }
                await task.save();
            });
            await Promise.all(healthCheckPromises);
            
        } catch (cronError) {
            console.error('Error in health check cron:', cronError);
        }
    });
};

const dummyCron=()=>{
    cron.schedule(`*/1 * * * *`,()=>{
        console.log('Dummy cron is running')
    })
}

module.exports={
    healthCheckCron,
    dummyCron
}