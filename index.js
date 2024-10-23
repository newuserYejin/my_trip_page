document.addEventListener("DOMContentLoaded", function () {
    // 프로그래스 바 엘리먼트
    const progressBar = document.getElementById("myBar");
    const airplane = document.querySelector(".airplane")
    const topBtn = document.querySelector(".topButton")
    const footer = document.querySelector("footer");

    // window 스크롤 이벤트 감지 및 콜백 셋팅
    window.addEventListener("scroll", function () {
        // body의 margin-top 값
        const bodyMarginTop = parseInt(getComputedStyle(document.body).marginTop);

        // window의 스크롤 진행도 계산
        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = ((window.scrollY - bodyMarginTop) / (scrollHeight - bodyMarginTop)) * 100;

        // 계산된 스크롤 진행도를 CSS로 표현

        console.log("scrollHeight: ", scrollHeight)
        console.log(scrolled)

        if (scrolled <= 0) {
            progressBar.style.width = 0;
            airplane.style.left = 0
        } else {
            progressBar.style.width = scrolled + "%";
            airplane.style.left = scrolled + "%"
        }

        if (scrolled > 5) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });
});


document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('article[id]'); // main내용물의 div 태그들
    const navLinks = document.querySelectorAll('.progress_bar a'); // 진행바에 a들
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 170; // 진행바의 높이가 100px
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('selected'); // selected 제거
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('selected'); // 현재 섹션과 일치하는 링크에만 selected 추가
        }
    });
});


const topBtn = document.querySelector(".topButton");
topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
})

class card extends HTMLElement {

    static get observedAttributes() {
        return ['num']; // num값 가져오기
    }

    connectedCallback() {
        const num = this.getAttribute('num')
        const imageNum = this.getAttribute('imageNum')

        const imageList = [];

        for (let i = 1; i <= imageNum; i++) {
            imageList.push(`image/${num}day/img (${i}).jpg`)
        }

        const carouselItems = imageList.map((image, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${image}" class="" alt="이미지 ${index + 1}">
            </div>
        `).join('');

        const indicatorsItems = imageList.map((_, index) => `
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${index == 0 ? "active" : ""}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
        `).join('');


        const day1 = ["인천공항", "출발", "기내식", "하겐다즈", "호치민", "버스투어", "오페라하우스", "중앙우체국"];
        const day2 = ["메콩 투어", "메콩 강", "거북이", "악어먹이주기", "22spa"];  // 예시로 day2 추가
        const day3 = ["Taste of Saigon", "콩 카페", "크루즈", "디너", "여성의 날"];  // 예시로 day2 추가
        const day4 = ["아이스링크장", "스케이트", '벤탄시장', "야경", "야식"];  // 예시로 day2 추가
        const day5 = ["호치민", "인천", "기내식", "라운지", "스카이뷰"];  // 예시로 day2 추가

        const days = { 1: day1, 2: day2, 3: day3, 4: day4, 5: day5 };  // num 값을 기준으로 해당 배열 선택

        // 태그 리스트 생성
        const tagList = days[num].map(item => `
            <div class="tag">
                #${item}    
            </div>
         `).join('');

        this.innerHTML = `
            <div class="card" id="index${num}">
                <div class="cardName">${num}일차</div>

                <div id="carouselExampleIndicators" class="carousel slide" data-bs-interval=1800 data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        ${indicatorsItems}
                    </div>
                    <div class="carousel-inner">
                        ${carouselItems}
                    </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
                <div class="tagList">
                    ${tagList}
                </div>
            </div>
        `
    }
}

customElements.define('card-element', card);
