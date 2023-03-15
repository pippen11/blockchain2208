const paging = document.querySelector('#paging > ul')
const prevBlock = document.querySelector('#prevBlock')
const nextBlock = document.querySelector('#nextBlock')
const prevPage = document.querySelector('#prevPage')
const nextPage = document.querySelector('#nextPage')

const page = 1;
const view_article = 10;  // 한 화면에 보일 개수
const block_article = 5;  // 한 블럭당 보일 개수
let current_block = Math.ceil(page/block_article);
let pageInfo = {
    current_page: 1
}
let numClickFlag = false;
let btnClickFlag = false;
let Temp = {}

// paging function
function setPaging(start_page, end_page) {
    for (let i=start_page; i<=end_page; i++) {
        const liElement = document.createElement('li')
        const spanElement = document.createElement('span')
        spanElement.setAttribute('onClick', `pageMove(${i})`)
        spanElement.innerHTML = `[${i}]`
        liElement.appendChild(spanElement)
        paging.appendChild(liElement)
    }
}

// setting board list 
function setBoard(response, start_page, view_article) {
    const Nodes = response.data.result.slice((start_page-1)*view_article, start_page*view_article)

    const trElement = document.querySelector('#board_row').innerHTML;
    let template = '';
    Nodes.forEach(v => {
        template += trElement.replace(`{idx}`, v.idx)
                             .replace(`{subject}`, v.subject)
                             .replace(`{nickname}`, v.nickname)
                             .replace(`{date}`, v.date)
                             .replace(`{hit}`, v.hit)
    })
    const tbody = document.querySelector('#board > tbody')
    tbody.innerHTML = template;
}

// btn handler function
function nextBtnHandler(current_page) {
    if (current_page == pageInfo.total_page) {
        nextPage.hidden = true
    } else {
        nextPage.hidden = false
    }
}

// btn handler function
function prevBtnHandler(current_page) {
    if (current_page == page) {
        prevPage.hidden = true
    } else {
        prevPage.hidden = false
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    
    const response = await axios.post('http://localhost:4000/api/board/list', {
        withCredentials: true
    })

    Temp = {
        ...response
    }

    const {total_record} = response.data  // 592
    const total_page = Math.ceil(total_record/view_article) // 60 page
    const total_block = Math.ceil(total_page/block_article) // 6 block
    

    let start_page = (current_block - 1) * block_article + 1
    let end_page = current_block * block_article 
    if (end_page > total_page) { end_page = total_page }

    pageInfo = {
        ...pageInfo,
        total_page,
        total_block,
        start_page
    }

    setPaging(start_page, end_page)
    setBoard(response, start_page, view_article)

    prevBtnHandler(pageInfo.current_page)

    // previous blockMove 
    prevBlock.addEventListener('click', ()=>{        
        if (current_block == 1) { return }

        current_block = current_block - 1

        let start_page = (current_block - 1) * block_article + 1
        let end_page = current_block * block_article 
        if (end_page > total_page) { end_page = total_page }

        pageInfo.current_page = start_page
        pageInfo.start_page = start_page
        prevBtnHandler(pageInfo.current_page)
        nextBtnHandler(pageInfo.current_page)
        console.log('prevBlock-cur :', pageInfo.current_page)
        console.log('prevBlock-st :', start_page)
        paging.innerHTML = ''

        setPaging(start_page, end_page)
        setBoard(response, start_page, view_article)
    })

    // next blockMove
    nextBlock.addEventListener('click', ()=>{
        if (current_block == total_block) { return }

        btnClickFlag = true;

        current_block = current_block + 1

        let start_page = (current_block - 1) * block_article + 1
        let end_page = current_block * block_article 
        if (end_page > total_page) { end_page = total_page }

        pageInfo.current_page = start_page
        pageInfo.start_page = start_page
        prevBtnHandler(pageInfo.current_page)
        nextBtnHandler(pageInfo.current_page)
        console.log('nextBlock-cur :', pageInfo.current_page)
        console.log('nextBlock-st :', start_page)
        paging.innerHTML = ''

        setPaging(start_page, end_page)
        setBoard(response, start_page, view_article)
    })

    // previous pageMove
    prevPage.addEventListener('click', ()=>{

        if (numClickFlag) {
            pageInfo.current_page = pageInfo.current_page - 1
            numClickFlag = false
        } else if (btnClickFlag) {
            pageInfo.current_page = pageInfo.current_page - 1
            btnClickFlag = false;
        } else {
            pageInfo.current_page = pageInfo.current_page - 1
        }

        if (pageInfo.start_page <= 0) { pageInfo.start_page = 1 }

        prevBtnHandler(pageInfo.current_page)
        nextBtnHandler(pageInfo.current_page)
        console.log('prev-current-page ', pageInfo.current_page)
        console.log('prev-start-page ', pageInfo.start_page)
        if (pageInfo.current_page%block_article == 0) {
            pageInfo.start_page = pageInfo.current_page - block_article + 1
            current_block = current_block - 1
            end_page = current_block * block_article
            if (end_page > total_page) { end_page = total_page }
            paging.innerHTML = ''
            setPaging(pageInfo.start_page, end_page)
        }
        setBoard(response, pageInfo.current_page, view_article)
    })

    // next pageMove
    nextPage.addEventListener('click', ()=>{
        
        if (numClickFlag) {
            pageInfo.current_page = pageInfo.current_page + 1
            numClickFlag = false;
        } else if (btnClickFlag) {
            pageInfo.current_page = pageInfo.current_page + 1
            btnClickFlag = false;
        } else {
            pageInfo.current_page = pageInfo.current_page + 1
        }
        
        prevBtnHandler(pageInfo.current_page)
        nextBtnHandler(pageInfo.current_page)
        console.log('next-current-page : ', pageInfo.current_page)
        console.log('next-start-page : ', pageInfo.start_page)
        if (pageInfo.current_page%block_article == 1) {
            pageInfo.start_page = pageInfo.start_page + block_article
            current_block = current_block + 1
            end_page = current_block * block_article
            if (end_page > total_page) { end_page = total_page }
            paging.innerHTML = ''
            console.log(pageInfo.start_page)
            setPaging(pageInfo.start_page, end_page)
        }
        setBoard(response, pageInfo.current_page, view_article)
    })
})

function pageMove(num) {
    const Nodes = Temp.data.result.slice((num-1)*view_article, num*view_article)
    const trElement = document.querySelector('#board_row').innerHTML;
    let template = '';
    Nodes.forEach(v => {
        template += trElement.replace(`{idx}`, v.idx)
                             .replace(`{subject}`, v.subject)
                             .replace(`{nickname}`, v.nickname)
                             .replace(`{date}`, v.date)
                             .replace(`{hit}`, v.hit)
    })
    const tbody = document.querySelector('#board > tbody')
    tbody.innerHTML = template;
    pageInfo.current_page = arguments[0]
    console.log('numClick : ', pageInfo.current_page)
    numClickFlag = true
    prevBtnHandler(pageInfo.current_page)
    nextBtnHandler(pageInfo.current_page)
    // a(num)
}

// function a(num){
//     const pages = document.querySelectorAll('#paging > ul > li')
//     console.log(pages)
// }