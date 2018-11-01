window.onload =  httpGetAjax.httpGet("jsonStorage/MainPageInfo.json")
        .then(
            response => {
                let data = JSON.parse(response);
                data.forEach(function(item,i){
                    let th = document.createElement('th');
                    th.innerHTML = item.alias;
                    questName.appendChild(th);
                    let td = document.createElement('td');
                    td.innerHTML = `<img class="icon" id="${item.alias+"/"+item.globalId+"/"+item.status}" src="images/${item.status}.png">`;
                    questStatus.appendChild(td);
                           
         
                })
                let icon= document.getElementsByClassName("icon");
                for (let i=0; i<=icon.length-1; i++){
                    icon[i].addEventListener('click' , function(){
                            let forStorage = this.getAttribute("id").split("/");
                            localStorage.setItem('alias', forStorage[0]);
                            localStorage.setItem('globalId', forStorage[1]);
                            localStorage.setItem('status', forStorage[2]);
                            document.location.href = "quest.html";
                            })
                }
            }
        )
        
        .catch(error => {
        console.log(error); 
    });    