'use strict';
const wrap = document.querySelector('.wrap');
const form = document.querySelector('#searchBar');
const input = form.querySelector('input');
const url = "https://dapi.kakao.com/v3/search/book";
const _myHeaders = new Headers();
_myHeaders.append('Authorization',  "KakaoAK ece7d86d98810ba9ea844fe245cdb487");

let keyword = "미움받을 용기";
let _getQuery = `?query=${keyword}`;

const searchBook = (e) => {
    e.preventDefault();
    keyword = input.value;
    search(keyword);
}

const search = (keyword) => {
    let _getQuery = `?query=${keyword}`;
    fetch(url + _getQuery,
        {
            method: "get",    
            headers: _myHeaders
        })
        .then((temp4) => temp4.json() )
        .then(json => { createBookManual(json); })
        .catch((err) => {alert('찾으시는 책이 없습니다;;')});
}

function createBookManual(json) {
    const con = document.createElement('div');
    con.classList.add('content');
    con.innerHTML = `
        <img src="${json.documents[0].thumbnail}" />
        <div>
            <h2>${json.documents[0].title}</h2>
            <p>${json.documents[0].contents}</p>
        </div>
    `;
    wrap.append(con);
}


form.addEventListener('submit',searchBook);