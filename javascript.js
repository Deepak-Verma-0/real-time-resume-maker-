function myfunction(){
  document.getElementById('demo').innerHTML="A resume is a document that provides a summary of an individual's education, work experience, skills, achievements, and qualifications. It is typically used by job seekers to apply for employment opportunities. Here's a breakdown of the key components of a resume."
}


// Start form control
var addBt= document.querySelector("#add-btn");
var box= document.querySelector(".box");

addBt.onclick  = function(){
  box.classList.add("active");
}

var closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", () => {
  box.classList.remove("active");
});

// -----------------------------------------------------create-------------
var userData =[];
var photoPic= document.querySelector("#photo");
var uploadPic=document.querySelector("#upload-photo");
var firstEl= document.querySelector("#fname");
var emailEl=document.querySelector("#mail");
var pnameEl=document.querySelector("#pname");
var addEl=document.querySelector("#add");
var jobtEl=document.querySelector("#jobt");
var skillEl=document.querySelector("#Skill");
var createBtn = document.querySelector(".create-btn");
var updateBtn = document.querySelector("#update-btn");
var formClear = document.querySelector("#form-id");
var imgUrl;

createBtn.onclick = function(e){
  //page reload solve
  e.preventDefault();
  createData();
  table();
  formClear.reset('');
  //close box
  closeBtn.click();
  updateBtn.disabled=true;
}
// come data to local
if(localStorage.getItem("userData") != null){
  userData = JSON.parse(localStorage.getItem("userData"));
 
}


function createData(){
  userData.push({
    first : firstEl.value,
    email : emailEl.value,
    number :pnameEl.value,
    address : addEl.value,
    job_title : jobtEl.value,
    skill :skillEl.value,
    photoPic : imgUrl == undefined ? "124.jpg" : imgUrl,
  });
  var userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal("Good job!", "Registration Success!", "success");
}

//start returing data on page from local

var tableData=document.querySelector("#table-data");

function table(){
  tableData.innerHTML="";
  userData.forEach((data,index)=>{
    
    tableData.innerHTML+=`
              <tr >
                <td>${index+1}</td>
                <td><img src="${data.photoPic}" width="40" height="40"></td>
                <td>${data.first}</td>
                <td>${data.email}</td>
                <td>${data.number}</td>
                <td>${data.address}</td>
                <td>${data.job_title}</td>
                <td>${data.skill}</td>
                <td>
                    <button class="edit-btn"><i class="ri-eye-fill"></i></button>
                     <button class="del-btn" style="background-color: red; border: red;"><i class="ri-delete-bin-5-fill" ></i></button>
                 </td>
            </tr>
    `;
  });
};
table();


// Start delete btn----------------------------------------------------
var i;
var allDelBtn = document.querySelectorAll(".del-btn");

for (i = 0; i < allDelBtn.length; i++) {
  allDelBtn[i].onclick = function() {
    var tr = this.parentElement.parentElement;
    var id = tr.getAttribute("index");
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        userData.splice(id,1);
        localStorage.setItem("userData",JSON.stringify(userData));
        tr.remove();
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    
  }
}

//Start update coding-----------------------------------------------------------

var updateIndex;
var i;
var allEdit = document.querySelectorAll(".edit-btn");
for(i=0;i<allEdit.length;i++){
  allEdit[i].onclick =function(){
    var tr=this.parentElement.parentElement;
    var td= tr.getElementsByTagName("TD");
    var index=tr.getAttribute("index");
    var imgTag = td[1].getElementsByTagName("img");
    var photo_pic=imgTag[0].src;
    var first=td[2].innerHTML;
    var email=td[3].innerHTML;
    var number =td[4].innerHTML;
    var address=td[5].innerHTML;
    var job_title=td[6].innerHTML;
    var skill=td[7].innerHTML;
    
 
    firstEl.value=first;
     emailEl.value=email;
    pnameEl.value=number;
     addEl.value=address;
    jobtEl.value=job_title;
    skillEl.value=skill;
  
    photoPic.src=photo_pic;

    updateIndex=index;

    createBtn.disabled=true;

    addBt.click();

    updateBtn.onclick=function(e){
    
     
      userData[updateIndex]={
        first : firstEl.value,
        email : emailEl.value,
        number :pnameEl.value,
        address : addEl.value,
        job_title : jobtEl.value,
        skill :skillEl.value,
        photoPic : uploadPic == "" ? photoPic : imgUrl,
    
      }
      localStorage.setItem("userData",JSON.stringify(userData));
    }
  }
  
}








// image process--------------------------------------------------------------


uploadPic.onchange= function(){
  if(uploadPic.files[0].size<1000000){
    var fReader = new FileReader();
    fReader.onload=function(e){
       imgUrl = e.target.result;
      photoPic.src = imgUrl;
      console.log(imgUrl);
    }
    fReader.readAsDataURL(uploadPic.files[0]);
  }else{
    alert("File Size is to Long.")
  }
}

///----------------------start search coding--------------------------

var resumeEl = document.querySelector("#resume-name");
resumeEl.oninput=function(){
  searchFuc();
}

function searchFuc(){
  var tr= tableData.querySelectorAll("TR");
  var filter=resumeEl.value.toLowerCase();
  var i;
  for(i=0;i<tr.length;i++){
    var td=tr[i].getElementsByTagName("TD")[2];
    var id =td.innerHTML;
    if(id.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display ="";
    }else{
      tr[i].style.display ="none";
    }
  }
}







