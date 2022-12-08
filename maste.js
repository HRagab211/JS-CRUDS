//---------------Variables declaration ---------------------------------------------------------------------------------------------------------
let title     = document.getElementById('title');
let price     = document.getElementById('price');
let taxes     = document.getElementById('taxes');
let ads       = document.getElementById('ads');
let discount  = document.getElementById('discount');
let total     = document.getElementById('total');
let count     = document.getElementById('count');
let category  = document.getElementById('category');
let btncreate = document.getElementById('create');
let btnslider =document.getElementById('btnslider');
let mood="create";
let temp;
//---------------------------------------------------------------------------------------------------------------------------------------------
// console.log(scrollY>40
//-------------------------------------

window.onscroll=()=>{
    
    if (scrollY>=150){
        btnslider.style.display="block";
    }
    else{
        btnslider.style.display="none";

    }
}

btnslider.onclick=()=>{
window.scrollTo(
{
    top:0,
    right:0,
    behavior:"smooth"
});
}

//----------------
// if (allproducts.length>=0){

    // let Delall=document.createElement('button');
    // Delall.innerHTML="Delete All"
    // Delall.style.margin="10px";

    // Delall.onclick= function(){
    //     deleteall();
    // };
    // document.querySelector('.outputs').appendChild(Delall);
    // // console.log(Delall); 

// }






// 1-get total
function getTotal () {
    if(price.value !=""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.backgroundColor ="#028b20";
        total.innerHTML=result;
    }
    else
    {
        total.style.backgroundColor ="#a00d02";
        total.innerHTML="";
    }

  }

//   2-create product

var allproducts;

    if(localStorage.product!=null)
        {
            allproducts =JSON.parse(localStorage.product);
        }
        else{
           allproducts=[];
        }
 
    btncreate.onclick=function(){
        let newProduct = {
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value,
        };
        
        // 3-push to array
        if(title.value!="" && price.value!=''&&category.value!=''
        && count.value<=40
        )
        {

        if(mood==='create'){
        if (newProduct.count>1)
            {
                for (let i = 0; i < newProduct.count; i++) {             

                    allproducts.push(newProduct);
                }
            }
        
            else{
        allproducts.push(newProduct);
    }
}

clearinputs();
}
else{
    allproducts[temp]=newProduct;
    count.style.display="block";
    btncreate.innerHTML="Create";
    mood="create";

}
        localStorage.setItem('product',JSON.stringify(allproducts));
        readData();
    }


  
    // 4-clear inputs
    function clearinputs(){
        title.value     ='';
        price.value     ='';
        ads.value       ="";
        taxes.value     ='';
        discount.value  ='';
        total.innerHTML ="";
        count.value     ="";
        category.value  ='';
    }
    
    // 5-READ

    function readData(){
        let tbody = document.getElementById('tbody');
        let table='';
        // let x=1;
        for (let i = 0; i < allproducts.length; i++) {            
            table +=`
            <tr>
            <td>${i+1}</td>
            <td>${allproducts[i].title}</td>
            <td>${allproducts[i].price} $</td>
            <td>${allproducts[i].taxes} $</td>
            <td>${allproducts[i].ads} $</td>
            <td>${allproducts[i].discount} $</td>
            <td>${allproducts[i].total} $</td>
            <td>${allproducts[i].category}</td>
            <td><button onclick= "update(${i})" id="update">update</button></td>
            <td><button onclick= "destroy(${i})" id="delete">delete</button></td>
        </tr>
            `;
            
        }
            tbody.innerHTML =table;
            if(allproducts.length>0)
            {
                let btndel=document.querySelector('#deletall');
                btndel.innerHTML=`
                <button onclick="deleteall(this.id)" id="destroy">Delete all (${allproducts.length})</button>
                `;
            }
            // else{
            //     Delall.style.display="none";
            // }
    }
    readData();
     
    // 7-delete
    function destroy(id){
        allproducts.splice(id,1);
        localStorage.product =JSON.stringify(allproducts);
        readData();
    }
    //DELETE ALL

            function deleteall(id){
            let btndel=document.getElementById(id);
            localStorage.clear();
            allproducts.splice(0);
            btndel.style.display="none";
            readData();
        }



    // 8-update
        function update(id){
            title.value = allproducts[id].title;
            price.value =allproducts[id].price;
            taxes.value =allproducts[id].taxes;
            ads.value   =allproducts[id].ads;
            discount.value=allproducts[id].discount;
            category.value=allproducts[id].category;
            count.style.display="none";
            btncreate.innerHTML="Update";
            title.focus();
            mood = "update";
            temp=id;
            getTotal();
            scroll({
                top:0,
                behavior:"smooth",
            })
        }


        
        // searchcategory
        // 9-search
        let searchm="title";
        function searchMood(mood){
            let searchbar = document.getElementById('search');
            // console.log(searchbar)
            if (mood=="searchtitle")
            {
            searchm ="title";
            searchbar.placeholder = `Search by ${searchm}`;
        }
        else{
            
            searchm ="category";
            searchbar.placeholder = `Search by ${searchm}`;
                // console.log(search);
            }
            searchbar.focus();

        }

        function search(value){
            if (searchm =="title"){
                let tbody = document.getElementById('tbody');
                let table='';

                for (let i = 0; i < allproducts.length; i++) {     
                    if(allproducts[i].title.includes(value))
                    {
                        table +=`
            <tr>
            <td>${i+1}</td>
            <td>${allproducts[i].title}</td>
            <td>${allproducts[i].price} $</td>
            <td>${allproducts[i].taxes} $</td>
            <td>${allproducts[i].ads} $</td>
            <td>${allproducts[i].discount} $</td>
            <td>${allproducts[i].total} $</td>
            <td>${allproducts[i].category}</td>
            <td><button onclick= "update(${i})" id="update">update</button></td>
            <td><button onclick= "destroy(${i})" id="delete">delete</button></td>
        </tr>
            `;
        }
        
    }
    tbody.innerHTML =table;
    console.log(table);
}



else{
    if (searchm =="category"){
        let tbody = document.getElementById('tbody');
        let table='';

        for (let i = 0; i < allproducts.length; i++) {     
            if(allproducts[i].category.includes(value))
            {
                table +=`
    <tr>
    <td>${i+1}</td>
    <td>${allproducts[i].title}</td>
    <td>${allproducts[i].price} $</td>
    <td>${allproducts[i].taxes} $</td>
    <td>${allproducts[i].ads} $</td>
    <td>${allproducts[i].discount} $</td>
    <td>${allproducts[i].total} $</td>
    <td>${allproducts[i].category}</td>
    <td><button onclick= "update(${i})" id="update">update</button></td>
    <td><button onclick= "destroy(${i})" id="delete">delete</button></td>
</tr>
    `;
}

}
tbody.innerHTML =table;
console.log(table);
}

}
        }

