const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports.initRouter = function (app) {

    let filePath = path.resolve('./routers');

    let files = fs.readdirSync(filePath);

    _.each(files,(item) => {

        if(/^~/.test(item)){
            return;
        }
        let routePath = path.join(filePath,item,'route.js');
        if(fs.existsSync(routePath)){
            let route = require(routePath.toString());
            app.use('/apis/v1/'+item,route);
        }

        // let obj = item.match(/(.*)\.js$/);
        // if(obj.length==2 && obj[1]){
        //     let fileName = obj[1];
        //     if(fileName!='index' && fileName !='util'){
        //         let route = require('./'+fileName);
        //         app.use('/'+fileName,route);
        //     }
        // }
    });

};