import './Home.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { useEffect, useState } from 'react';
import axios from "axios";

function Home() {

  const [searchValue, setSearchValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const apikey = "d10ed0229f9249e4aa1431082fce9492";

  useEffect(()=>{
    let sButton = document.querySelector('.searchButton');
    let cButton = document.querySelector('.closeButton');
    let sBar = document.querySelector('.searchBar');
    let header = document.querySelector('.header');
    let navitems = document.querySelector('.nav');
    let navtoggle = document.querySelector('.navToggle');
    

    sButton.onclick = () => {
      sBar.classList.add('active');
      cButton.classList.add('active');
      sButton.classList.add('active');
      navtoggle.classList.add('hide');
    }
    cButton.onclick = () => {
      sBar.classList.remove('active');
      cButton.classList.remove('active');
      sButton.classList.remove('active');
      navtoggle.classList.remove('hide');
    }
    navtoggle.onclick = () => {
      header.classList.toggle('open');
      sBar.classList.remove('active');
      cButton.classList.remove('active');
      sButton.classList.remove('active');
    }

    window.onscroll = () => {
      scrolling();
    }
    function scrolling(){
      if(window.scrollY > 0) {
        header.classList.add('sticky');
      }
      else
      {
        header.classList.remove('sticky');
      }
    }
    window.addEventListener('scroll', scrolling);

    document.querySelector('#searchText').onkeypress = (e) => {
      if (!e) e = window.event;
      var keyCode = e.code || e.key;
      if(keyCode == 'Enter' || keyCode == 'NumpadEnter')
      {
        const sValue = document.querySelector('#searchText').value;
        const sValue1 = (sValue.trim()).replace("  ", " ");
        const sValueAll = (sValue1.trim()).replace(" ", " AND ");
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        let requesturl = "https://newsapi.org/v2/everything?q=" + sValueAll + "&searchIn=title" +
        "&from=" + year + "-" + (month < 10 ? '0' : '') + month +"-01&sortBy=popularity&apiKey=" 
        + apikey + "&pageSize=10";

        axios.get(requesturl).then((response) => {
          document.querySelector('#searchResults').innerHTML = "";
          let innerhtml = "<ul>";
          for (let i=0; i<response.data.articles.length; i++)
          {
            innerhtml += "<li>"+
            "<a href='"+response.data.articles[i].url+"'>"+response.data.articles[i].title+"</a> • Author: "+response.data.articles[i].author+"</li>";
          }
          innerhtml += "</ul>";
          //setResultValue(innerhtml);
          document.querySelector('#searchResults').innerHTML = innerhtml;
        });
      }
    }
  });

  return (
    <div>
      <div className="header">
        <a href="#" className="brandlogo">LOGO</a>
        <div className="menuitems">
          <ul className="nav">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <div className="search">
            <span className="icon">
              <FaMagnifyingGlass className="searchButton"/>
              <FaXmark className="closeButton" />
            </span>
          </div>
          <IoIosMenu className="navToggle"/>
        </div>
        <div className="searchBar">
          <input type="text" placeholder="Type here and hit ENTER..." id="searchText" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
        </div>
      </div>
      <div className="content">
      <p id="searchResults"></p>
      <h1>Lorem Ipsum Text</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat eget mi ut suscipit. Duis convallis quis dolor vitae pretium. Duis sollicitudin porta ultrices. Aenean libero erat, consequat ut dapibus in, tristique sit amet ex. Etiam in ipsum et felis ultricies tristique et vitae augue. Duis convallis arcu non sapien pharetra, vitae pharetra elit commodo. Phasellus at diam volutpat, feugiat orci non, dignissim justo. Morbi vestibulum blandit elit sed posuere. Cras facilisis egestas sem. Cras porta iaculis ex. Curabitur bibendum nisi vel massa dignissim, non rutrum mi convallis. Donec bibendum eget massa sit amet elementum. Donec at tristique odio, nec blandit nunc. Vestibulum id lorem lobortis elit consectetur suscipit tincidunt ac enim. Curabitur maximus ac neque ac laoreet.</p>
      <p>Maecenas scelerisque elit in aliquam fermentum. Proin et leo dolor. Donec lacus tellus, ullamcorper at magna eget, facilisis consectetur diam. Sed ac turpis gravida, rhoncus risus a, maximus enim. Pellentesque cursus, urna ac semper gravida, mi tortor porttitor ex, nec placerat enim urna a eros. Ut efficitur suscipit suscipit. Cras pharetra condimentum elit, eget rutrum risus pretium sit amet. Vestibulum congue magna eros, at cursus turpis vestibulum non. Etiam pellentesque facilisis nulla, a pretium tortor consectetur at. In tristique nec velit nec luctus. Nullam rutrum massa nec laoreet facilisis. Curabitur et nisi id metus porta rhoncus vitae et tortor. Fusce ullamcorper efficitur augue non scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>Phasellus pretium risus ac velit aliquet scelerisque ac vitae lacus. Maecenas a elit tincidunt, egestas turpis non, aliquam dui. Etiam semper magna eu porttitor suscipit. Duis finibus nulla et eros dapibus, ac convallis arcu condimentum. Vestibulum convallis a nunc sit amet vehicula. Morbi porttitor condimentum sapien non efficitur. Cras rutrum orci eleifend eros semper, sit amet commodo libero convallis.</p>
      <p>Fusce feugiat id magna at consequat. Cras dictum rutrum rhoncus. Proin non nisl lectus. Pellentesque eget convallis mi. Pellentesque sagittis est et est elementum pharetra. Donec vehicula, turpis varius tincidunt pretium, tortor ligula tempor turpis, vitae sagittis dui quam ac massa. Vivamus risus augue, pharetra a sem auctor, interdum suscipit nibh. Suspendisse eu arcu non ligula aliquam maximus. Vestibulum nisi sapien, venenatis sit amet lorem eu, imperdiet efficitur sapien.</p>
      <p>Vivamus blandit laoreet dolor eget dictum. Morbi in felis nisi. Morbi sit amet urna feugiat, molestie arcu ac, consectetur dui. Fusce auctor, tellus vel maximus aliquet, arcu odio placerat nisi, pulvinar tempor libero justo id ante. Donec elementum turpis ut dignissim blandit. Sed sit amet consectetur neque, a condimentum lectus. Morbi condimentum et mauris congue hendrerit. Nulla est enim, pharetra nec nisl quis, ultrices gravida arcu. Praesent pretium metus eget nisl elementum, vel blandit felis molestie. Suspendisse et porta odio, vel condimentum lorem. Sed hendrerit, massa id semper gravida, est diam vehicula nulla, vel faucibus enim massa eu neque. Mauris metus orci, tincidunt at sem sit amet, aliquet maximus lacus.</p>
      </div>
    </div>
  );
}

export default Home;
