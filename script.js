const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');



// 定義一個空陣列來存儲從 API 獲取的名言
let apiQuotes=[];

// Show New Quote 
function newQuote(){
     // Pick a random quote from apiQuotes array
     const quote= apiQuotes[Math.floor(Math.random() *  apiQuotes.length)];
    //  console.log(quote);
    
    // authorText.textContent=quote.author;
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent= 'Unknown';
    }else{
        authorText.textContent=quote.author;
    }

    // Chenk Quote length to determine styling
    if(quote.text.length>100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');

    }

    quoteText.textContent=quote.text;
}


// Get Quotes From API
// 定義一個非同步函數，用來從 API 獲取名言
async function getQuotes() {
    // 定義 API 的 URL，這個 URL 指向一個包含名言數據的 JSON 文件
    const apiUrl= 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    
    // 使用 try-catch 語句來處理可能的錯誤
    try {
        // 發送網路請求並等待結果返回
        // this means that this constant will not be populated until it has some data fetched from our API.
        // 這行代碼表示從 API 獲取數據之前，常量 response 不會被賦值
        const response = await fetch(apiUrl);

        // 等待將 response 轉換為 JSON 格式並賦值給 apiQuotes 
        apiQuotes=await response.json();

        // 在控制台輸出從 API 獲取的名言數據
        // console.log(apiQuotes[12]);
        newQuote();
    } catch(error){
        // 在這裡捕捉並處理可能發生的錯誤 
        // Catch Error Here
    }
}

// Tweet Quote 
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// 當頁面加載時調用 getQuotes 函數來從 API 獲取名言
// On Load 
getQuotes();