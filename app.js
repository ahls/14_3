const _key=  "ZD8OT10E2pmFxGG8m4P5v3mdLHc5wvbj";
const searchText = document.querySelector('#searchText');
const searchForm = document.querySelector('form');
const container = document.querySelector('#gifContainer')
async function GetGif()
{
    const randomOffset = Math.floor(Math.random()*30); 
    const searchValue = searchText.value == ""? "random":searchText.value;
    const res = await axios.get('https://api.giphy.com/v1/gifs/search',{params:{api_key:_key, q:searchValue, limit:1,offset:randomOffset}})
    searchText.value = "";
    AppendToContainer(res.data.data[0].images.original.url);
}
function AppendToContainer(src)
{
    const newImg = document.createElement('img');
    newImg.src=src;
    container.appendChild(newImg);
}
searchForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    GetGif();
})
document.querySelector('.deleteBtn').addEventListener('click',(e)=>
{
    e.preventDefault();
    container.innerHTML="";
})
container.addEventListener('click',(e)=>
{
    if(e.target.tagName != 'IMG') return;
    navigator.clipboard.writeText(e.target.src);
    alert("source copied to the clipboard!")
})