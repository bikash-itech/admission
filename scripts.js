let data = [];
document.getElementById("file")
  .addEventListener('change', function (){
    let fileName= document.getElementById("file").value;
    let fileExt=fileName.substring(fileName.lastIndexOf('.')+1);
    if(fileExt==="txt"){
      document.getElementById("status")
              .textContent = "";
      let fr = new FileReader();
      fr.onload = function(){
        document.getElementById("upload")
          .addEventListener('click', function (){
            let txt = fr.result;
            let rows = txt.split("\r\n");
            let i=0;
            let indices=[];
            rows.forEach(row => {
              if(i===0){
                indices = row.split("\t");
                i++;
              }else{
                let j=0;
                let val = row.split("\t");
                let data_row ={};
                indices.forEach(index => {
                  data_row[index.toLowerCase()]=val[j];
                  j++;
                });
                data.push(data_row);
                i++;
              }
            });
            document.getElementById("status")
              .style.color = 'black';
            document.getElementById("status")
              .textContent = "Data Uploaded Successfully!!!!";
            
            //console.log(data);
          }) 
      }
      fr.readAsBinaryString(this.files[0]);
    }else{
      document.getElementById("status")
              .style.color = 'red';
      document.getElementById("status")
              .textContent = "Invalid File Format. Only '.txt' file accepted!!!!!";
    }
  })
  
  //console.log(data);
/* document.getElementById("btn")
  .addEventListener("click", function () {
    const link = document.createElement('a');
    const content = genData(data);
    const file = new Blob([content], {type: 'text/plain'});
    link.href = URL.createObjectURL(file);
    link.download = "newdata.txt";
    link.click();
    URL.revokeObjectURL(link.href);
    //console.log(content);
    }, false);*/

function genData(data){
  let ur=document.getElementById("ur").value;
  let obc=document.getElementById("obc").value;
  let sc=document.getElementById("sc").value;
  let stp=document.getElementById("stp").value;
  let sth=document.getElementById("sth").value;
  let ews=document.getElementById("ews").value;
  let other=document.getElementById("other").value;
  
  sortedData=sortCandidates(data);
  const keys = Object.keys(sortedData[0]);
  let s ="Sl. No.";
  let s_sc ="";
  let s_stp ="";
  let s_sth ="";
  let s_ews ="";
  let s_other ="";
  let s_extra ="";
  for(k in keys){
      s+="\t"+keys[k];
      }
  s+="\r\n";
  let i={ur: 0, obc:0, sc:0, stp:0, sth:0, ews:0, other:0};
  sortedData.forEach(line => {
    if(i.ur<ur){
      if(i.ur===0){
          s+="Category: UNRESERVED\n";
        }
      s+=(i.ur+1);
      for(x in line){
      s+="\t"+line[x];
      }
      s+="\r\n";
    }else{
      if(line.category==="OBC" && i.obc<obc){
        if(i.obc===0){
          s+="Category: OBC\n";
        }
        s+=(i.obc+1);
        for(x in line){
        s+="\t"+line[x];
        }
        s+="\r\n";
        i.obc++;
      }else if(line.category==="SC" && i.sc<sc){
        if(i.sc===0){
          s_sc+="Category: SC\n";
        }
        s_sc+=(i.sc+1);
        for(x in line){
        s_sc+="\t"+line[x];
        }
        s_sc+="\r\n";
        i.sc++;
      }else if(line.category==="ST(P)" && i.stp<stp){
        if(i.stp===0){
          s_stp+="Category: ST(P)\n";
        }
        s_stp+=(i.stp+1);
        for(x in line){
        s_stp+="\t"+line[x];
        }
        s_stp+="\r\n";
        i.stp++;
      }else if(line.category==="ST(H)" && i.stp<sth){
        if(i.sth===0){
          s_sth+="Category: ST(H)\n";
        }
        s_sth+=(i.sth+1);
        for(x in line){
        s_sth+="\t"+line[x];
        }
        s_sth+="\r\n";
        i.sth++;
      }else if(line.category==="EWS" && i.ews<ews){
        if(i.ews===0){
          s_ews+="Category: EWS\n";
        }
        s_ews+=(i.ews+1);
        for(x in line){
        s_ews+="\t"+line[x];
        }
        s_ews+="\r\n";
        i.ews++;
      }else if(line.category==="Other" && i.other<other){
        if(i.other===0){
          s_other+="Category: Other\n";
        }
        s_other+=(i.other+1);
        for(x in line){
        s_other+="\t"+line[x];
        }
        s_other+="\r\n";
        i.other++;
      }else{
        s_extra+=(i.ur+1);
        for(x in line){
        s_extra+="\t"+line[x];
        }
        s_extra+="\r\n";
      }
    }
    i.ur++;
  });
  //console.log(s);
  document.getElementById("output")
            .textContent = s+s_sc+s_stp+s_sth+s_ews+s_other+"\n\nRemaining Applicants\n"+s_extra;
}

function sortCandidates(data) {
  const sortedData = data;
  sortedData.sort((a,b)=>{
    if(b.percentage<a.percentage){
      return -1;
    }
    if(b.percentage>a.percentage){
      return 1;
    }
    return 0;
  });
  return sortedData;
}

function copyData(){
  var text=document.getElementById('output');
  text.select();
  navigator.clipboard.writeText(text.value);
  alert('Text Copied!!!!');
}
