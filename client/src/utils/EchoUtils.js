
export const buildJSON = (tokenData, tokenJson) => {
    //console.log("dynamic json, tree received -->");
    //console.log(JSON.stringify(this.props.tokenData));

    let taskIdCount = 1;
    let taskIds = [];
    for (let i in tokenData){
        //console.log(i);
       // console.log(tokenData[`${i}`]);

        tokenJson.tasks[`task-${taskIdCount}`] = 
            { id: `task-${taskIdCount}`,
              symbol: tokenData[`${i}`].symbol,
              image: tokenData[`${i}`].image,  
            }

        taskIds.push(`task-${taskIdCount}`);
        taskIdCount++;
    }

    tokenJson.columns["column-1"].taskIds = taskIds;
    //console.log(taskIds);
    //console.log(tokenJson);
    //console.log(JSON.stringify(tokenJson));
    return tokenJson;
}