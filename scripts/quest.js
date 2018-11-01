window.onload = function(){
            if(localStorage.getItem("status")=="NO_DATA"){
             main.innerHTML="<img src='images/notInfo.png'>"   
            }
            
           else 
            httpGetAjax.httpGet("jsonStorage/GeneralQuestsInfo.json")
            .then(
                response => {
                    let data = JSON.parse(response);
                    let quest;
                    data.forEach(function(item,i){
                        if((item.alias == localStorage.getItem("alias")) && (item.globalId == localStorage.getItem("globalId")) ){
                            quest=item;
                    }
                })
                
                    buildId.innerHTML=quest.globalId;
                    platform.innerHTML=quest.platform;
                    questName.innerHTML=quest.name;
                    Status.innerHTML=quest.pathway.status;
                    pathsName.innerHTML=quest.pathway.name;
                    console.log(quest.pathway.leafs);
                
                    httpGetAjax.httpGet("jsonStorage/FinishedQuestsLeafs.json")
                    .then(
                        response => {
                            
                            let data = JSON.parse(response);
                            let passedQuest=[];
                            let img = document.createElement('img');
                            let str =document.createElement("span");
                            str.innerHTML="&rarr;"
                            
                            data.forEach(function(item,i){
                                if(item.questId == quest.id){
                                    
                                    if(quest.pathway.leafs.indexOf(item.name) != -1){
                                        let img = document.createElement('img');
                                        img.src="images/SUCCESS.png";
                                        let str =document.createElement("span");
                                        leafs.appendChild(img);
                                        leafs.appendChild(str);
                                        passedQuest.push(item.name)
                                    }
                            
                                }
                            })
                            
                            if (passedQuest.length<quest.pathway.leafs.length){
                                let img = document.createElement('img');
                                        img.src="images/CRASH.png";
                                        leafs.appendChild(img);
                                        leafs.appendChild(str);
                            }
                            leafs.removeChild(leafs.lastChild);
                        }
                    )
            }
        )
                          
        .catch(error => {
        console.log(error); 
    });
}