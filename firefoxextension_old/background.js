//console.log("Extension enabled!")

function getToken(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        console.log(this);
        if(this.readyState === 4) {
            obj = JSON.parse(this.responseText);
            console.log(obj['access_token']);
            getData(obj['access_token'])
        }
        else {
            console.log(this.readyState);
        }
    });
    xhr.open("GET", "https://ehr-auth-hmg.saude.gov.br/api/token");
    xhr.send();
}

function getData(token){
    var data = JSON.stringify({"query": {"match": {"paciente_idade": 91}}});
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    xhr.open("GET", "https://servicos-es.hmg.saude.gov.br/e-SUSVE/imunizacao-covid-df/_search?pretty");
    xhr.setRequestHeader("Authorization", token);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}