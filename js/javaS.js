
var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("bookmarkURL");

var sites = [];
if(localStorage.getItem("sites") != null){
    sites = JSON.parse(localStorage.getItem("sites"))
    displaySites();
}

function submit() {
    var site = {
        name: siteNameInput.value,
        url: siteUrlInput.value,
    }

    //check name = name
    var test = true;
    if(sites.length == 0){
        sites.push(site);
        localStorage.setItem("sites",JSON.stringify(sites))
        displaySites();  
    }
    for(var i=0 ; i < sites.length; i++){   
        if(sites.length != 0 && sites[i].name == site.name){
            test = false;
        }
    }
    if(test){//true
        sites.push(site);
        localStorage.setItem("sites",JSON.stringify(sites))
        displaySites();    
    }
}

function displaySites() {
    var temp = '';
    for(var i=0; i < sites.length; i++){
        temp += `<tr>
            <td>`+ i +`</td>
            <td>`+ sites[i].name +`</td>
            <td>
                <button onclick="visitSite(`+i+`)" class="btn btn-visit">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                </button>
            </td>
            <td>
                <button onclick="deleteSites(`+i+`)" class="btn btn-delete">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                </button>
            </td>
        </tr>`
    }
    document.getElementById('tableContent').innerHTML = temp
}

function deleteSites(index){
    sites.splice(index,1);
    displaySites();
    localStorage.setItem("sites",JSON.stringify(sites))
}

function visitSite(index){
    var newUrl = sites[index].url;
    // location.assign(newUrl);
    window.open(newUrl, "_blank");
}

function validate(e){
    //
    var patternName = /[A-Za-z0-9]{3,}/;
    var patternUrl = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}/
    if(patternName.test(e.value) || patternUrl.test(e.value)){
        e.classList.remove("red")
        e.classList.add("green");
    }else{
        e.classList.remove("green")
        e.classList.add("red");
    }
}
