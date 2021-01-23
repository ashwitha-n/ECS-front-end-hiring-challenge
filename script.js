// api url 
const api_url = 
	"https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"; 

var data;

// Defining async function 
async function getapi(url) { 
	
	// Storing response 
	const response = await fetch(url); 
	
	// Storing data in form of JSON 
	data = await response.json(); 
	console.log(data); 
	if (response) {  
        show(data);
    } 
    
} 
// Calling that async function 
getapi(api_url); 

//Function to implement search functionality
function search(){
    let text=document.getElementById('searchVal').value;
    console.log(text);
    document.getElementById('searchVal').value='';

    //filters based on book name, author and language
    var data_filter = data.filter( element => element.language_code ==text 
        || element.authors.toString().includes(text)
        || element.title.toString().includes(text));
    show(data_filter);
}

function sort(){
    let key='average_rating';
    
    var data_filter= data.sort(function(a, b)
    {
    var x = a[key]; var y = b[key];
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
    show(data_filter);
}

// Function to define innerHTML for HTML table 
function show(data) { 
    
    document.getElementById("cartHead").style.display="none";
    let tab='';
    for(let book of data)
    {
        let rating=book.average_rating;
        let rating_rounded=Math.floor(rating);
        var i;
        let filled_rating='';
        for(i=1;i<=rating_rounded;i++)
        {
            filled_rating+=`<span class="fa fa-star checked"></span>`;
        }
        for(i=rating_rounded;i<5;i++)
        {
            filled_rating+=`<span class="fa fa-star "></span>`;
        }

        tab+=`
        <div class="col-lg-6 mb-4"> 
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-subtitle mb-2 text-muted"> By: ${book.authors}</p>
                    <p>${book.language_code}</p>
                    <p class="card-text">` + filled_rating + `reviewed by ${book.ratings_count} people</p>
                    <p>Cost is: ${book.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${book.bookID})">Add to cart</button>
                </div>
            </div>
        </div>`;
    }   
        // Setting innerHTML as tab variable 
        document.getElementById("books").innerHTML = tab; 
} 

//cart functionality
var cartElements=[];
function addToCart(index)
{
    console.log(index);
    cartElements.push(index);
}

function displayCart()
{
    document.getElementById("cartHead").style.display="block";
    document.getElementById("head").style.display="none";
    document.getElementById("checkoutButton").style.display="block";
    let tab='';
    for(let book of data)
    {
        if(cartElements.includes( book.bookID))
        {
            let rating=book.average_rating;
            let rating_rounded=Math.floor(rating);
            var i;
            let filled_rating='';
            for(i=1;i<=rating_rounded;i++)
            {
                filled_rating+=`<span class="fa fa-star checked"></span>`;
            }
            for(i=rating_rounded;i<5;i++)
            {
                filled_rating+=`<span class="fa fa-star "></span>`;
            }

            tab+=`
            <div class="col-lg-6 mb-4"> 
                <div class="card" >
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-subtitle mb-2 text-muted"> By: ${book.authors}</p>
                        <p>${book.language_code}</p>
                        <p class="card-text">` + filled_rating + `reviewed By ${book.ratings_count} people</p>
                        <p>Cost is: Rs.${book.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${book.bookID})">Add to cart</button>
                    </div>
                </div>
            </div>`;
        }
    }   
        // Setting innerHTML as tab variable 
        document.getElementById("books").innerHTML = tab; 



}