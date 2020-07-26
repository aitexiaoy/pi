const Koa = require('koa');
const rpio  =  require('rpio');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-body');
app.use(require('koa-static')(__dirname + '/static/'));

rpio.open(36,rpio.OUTPUT,rpio.HIGH) // set out by default low

function startIo(){
    rpio.write(36, rpio.HIGH);
}

function stopIo(){
    rpio.write(36, rpio.LOW);
}

router.post('/startwater', koaBody(),
    (ctx) => {
        console.log(ctx.request.body);
        // => POST body

        startIo()
        ctx.body = {
            returnCode: "0", //默认表示成功，其他不成功的字段自己可以确定	是
            returnErrorSolution: '',//	出错时解决办法的描述信息	否
            returnMessage: '执行成功',//	String	返回执行成功的描述信息	否
            returnValue: {
                "reply": "已经开始浇花了",
                "resultType": "RESULT",
                "executeCode": "SUCCESS",
                "msgInfo": ""
            },//
        };
    }
);

router.post('/stopwater', koaBody(),
    (ctx) => {
        console.log(ctx.request.body);
        // => POST body
        stopIo()
        ctx.body = {
            returnCode: "0", //默认表示成功，其他不成功的字段自己可以确定	是
            returnErrorSolution: '',//	出错时解决办法的描述信息	否
            returnMessage: '执行成功',//	String	返回执行成功的描述信息	否
            returnValue: {
                "reply": "停止浇花",
                "resultType": "RESULT",
                "executeCode": "SUCCESS",
                "msgInfo": ""
            },//
        };
    }
);


app.use(router.routes());

app.listen(3000);

console.log('开启服务成功....')
