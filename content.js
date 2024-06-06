// Sure, here is the complete code:


const dark = '#000000';
const white = 'white';
const lighter = '#e0e0e0';
const button = '#3A3A3A';

function load_box() {
    const targetElement = document.querySelector('.job-details-jobs-unified-top-card__job-title');
    if (targetElement) {
        let container = document.createElement('div');
        container.id = "scanjd_container"
        container.style.cssText = `
            background: ${white};
            width: 100%;
            height: 145px;
            border-radius: 12px;
            margin-top: 20px;
            margin-bottom: 10px;
            display: flex;
            box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.7);
        `;
        let left_div = document.createElement('div')
        left_div.id = "left_div"
        left_div.style.cssText = `
            padding: 5px;
            width: 40%;
            border-radius: 12px;
            background: linear-gradient(to bottom right, #767676 , #000000);
        `;
        let leftHeader = document.createElement("div");
        leftHeader.id = "leftHeader";
        leftHeader.style.color = "white";
        let heading = document.createElement("h3");
        heading.id = 'heading';
        heading.textContent = "SCAN JD";
        heading.style.cssText = `
            font-family: 'SF Pro Display', sans-serif;
            color: ${white};
            font-weight: bold;
            font-size: 24px;
            text-align: center;
        `;
        leftHeader.appendChild(heading);
        let leftBody = document.createElement("div");
        leftBody.id = "leftBody";

        left_div.appendChild(leftHeader);
        left_div.appendChild(leftBody);

        let right_div = document.createElement('div')
        right_div.id = "right_div"
        right_div.style.cssText = `
            width: 60%;
            background: ${white};
            border-radius: 12px;
            height: 145px;
            overflow: auto;
        `;
        container.appendChild(left_div)
        container.appendChild(right_div)

        const targetElements = document.querySelectorAll('div.jobs-search-results-list');
        targetElements.forEach((element) => {
            element.addEventListener('click', () => {
                setTimeout(() => {
                    load_home_content();
                }, 1);
            });
        });
        targetElement.insertAdjacentElement('afterend', container);
        attach_click_events()
        setTimeout(() => {
            load_home_content();
        }, 1500);
    }
};
setTimeout(() => {
    load_box();
}, 1500);

function attach_click_events() {
    const targetElements = document.querySelectorAll('div.jobs-search-results__list-item');
    targetElements.forEach((element) => {
        element.addEventListener('click', () => {
            setTimeout(() => {
                load_home_content();
            }, 1000);
        });
    });
}

function load_home_content() {
    let leftBody = document.getElementById("leftBody")
    if (!leftBody) {
        return;
    }
    leftBody.innerHTML = '';
    let right_div = document.getElementById('right_div');
    right_div.innerHTML = '';
    const analysisBTN = document.createElement('button');
    analysisBTN.id = 'analysisBTN';
    analysisBTN.textContent = 'Loading';
    analysisBTN.style.cssText = `
        font-family: 'SF Pro Display', sans-serif;
        cursor: pointer;
        background-color: ${white};
        color: ${dark};
        font-size: 14px;
        height: 35px;
        width: 105px;
        margin-left: calc(50% - 52px);
        margin-top: 25px;
        border-radius: 14.5px;
    `;
    leftBody.appendChild(analysisBTN);
    setTimeout(() => {
        analyze();
    }, 200);
}

function loadAnalysisRight(data){
    let rightA = document.getElementById('right_div');
    rightA.innerHTML = '';
    const customScrollbarCSS = `
        #right_div {
            overflow: hidden;
            padding-right : 10px;
        }
        #right_div:hover {
            overflow-y: scroll;
            padding-right : 0px;
        }
        #right_div::-webkit-scrollbar {
            width: 10px;
            right: -10px; 
        }
        #right_div::-webkit-scrollbar-track {
            border-radius: 20px;
            background-color: transparent;
        }
        #right_div::-webkit-scrollbar-thumb {
            border-radius: 20px;
            background-color: ${dark};
        }
    `;
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customScrollbarCSS;
    document.head.insertAdjacentElement('beforeend', styleElement);
    const skills = data.technical_skills;
    const skillsDiv = document.createElement('div')
    skillsDiv.id = 'skillsDiv';
    skillsDiv.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        margin: 5px;
    `;
    const divCSS = `
        height: 25px;
        background-color: ${button};
        font-weight: bold;
        font-size: 12px;
        color: white;
        margin: 4px;
        padding-top: 4.5px;
        padding-left: 8px;
        padding-right: 8px;
        border-radius: 12px;
    `; 
    for (let i = 0; i < skills.length; i++){
        const div = document.createElement('div');
        div.textContent = skills[i];
        div.style.cssText = divCSS;
        skillsDiv.appendChild(div);
    }
    rightA.appendChild(skillsDiv);
};

function analyze() {
    let leftBody = document.getElementById("leftBody")
    if (!leftBody) {
        return;
    }
    let analysisBTN = document.getElementById("analysisBTN")
    analysisBTN.textContent = "Loading"
    // 
    let jd_content = document.querySelector(".jobs-description-content__text")
    jd_content = jd_content.textContent
    let data = {
        "jd": jd_content,
    }
    fetch('http://127.0.0.1:8004/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            var applicantsData = document.createElement('div');
            applicantsData.style.cssText = `
                display: flex;
                align-items: center;
                margin-left: 5px;
            `;
            var applicantsImage = document.createElement('a');
            applicantsImage.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.2771 9.81585C14.7963 9.81585 16.0268 8.47865 16.0268 6.83384C16.0268 5.21415 14.8026 3.9209 13.2771 3.9209C11.7704 3.9209 10.5273 5.23298 10.5273 6.8464C10.5336 8.48493 11.7641 9.81585 13.2771 9.81585ZM6.00098 9.96024C7.32562 9.96024 8.39286 8.78627 8.39286 7.33608C8.39286 5.92355 7.32562 4.78097 6.00098 4.78097C4.6889 4.78097 3.60282 5.94238 3.6091 7.34235C3.6091 8.79255 4.68262 9.96024 6.00098 9.96024ZM13.2771 8.71722C12.4107 8.71722 11.6762 7.90109 11.6762 6.84012C11.6762 5.81682 12.4044 5.01953 13.2771 5.01953C14.156 5.01953 14.8779 5.80427 14.8779 6.83384C14.8779 7.88853 14.1497 8.71722 13.2771 8.71722ZM6.00098 8.87416C5.29158 8.87416 4.6889 8.19615 4.6889 7.34235C4.6889 6.52623 5.2853 5.86077 6.00098 5.86077C6.72922 5.86077 7.31934 6.51367 7.31934 7.33608C7.31934 8.19615 6.71666 8.87416 6.00098 8.87416ZM2.54813 15.7296H7.42606

V14.3008C7.42606 13.7387 7.12279 13.201 6.6141 12.8458C5.51595 12.0517 3.28125 12.0517 2.18311 12.8458C1.67442 13.201 1.37115 13.7387 1.37115 14.3008V15.7296H2.54813ZM2.54813 14.6309V14.3008C2.54813 14.0302 2.67731 13.778 2.90247 13.6176C3.57462 13.1333 5.22218 13.127 5.90061 13.6176C6.11904 13.778 6.24822 14.0302 6.24822 14.3008V14.6309H2.54813ZM8.91838 15.7296H13.7963V14.3008C13.7963 13.7387 13.493 13.201 12.9844 12.8458C11.879 12.0517 9.64425 12.0517 8.5461 12.8458C8.03741 13.201 7.73413 13.7387 7.73413 14.3008V15.7296H8.91838ZM8.91838 14.6309V14.3008C8.91838 14.0302 9.04756 13.778 9.27272 13.6176C9.94487 13.1333 11.5924 13.127 12.2708 13.6176C12.4893 13.778 12.6184 14.0302 12.6184 14.3008V14.6309H8.91838Z" fill="white"/>
                </svg>
            `;
            var applicantsText = document.createElement('p');
            applicantsText.textContent = response.applicants;
            applicantsText.style.cssText = `
                color: #FFFFFF;
                font-weight: bold;
                font-size: 12px;
                display: flex;
                margin-left: 5px;
            `;
            applicantsData.appendChild(applicantsImage);
            applicantsData.appendChild(applicantsText);
            
            var experienceData = document.createElement('div');
            experienceData.style.cssText = `
                display: flex;
                align-items: center;
                margin-left: 5px;
            `;
            var experienceImage = document.createElement('a');
            experienceImage.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99967 2.5C5.85796 2.5 2.5 5.85796 2.5 9.99967C2.5 14.1414 5.85796 17.4993 9.99967 17.4993C14.1414 17.4993 17.4993 14.1414 17.4993 9.99967C17.4993 5.85796 14.1414 2.5 9.99967 2.5ZM9.16602 10.1709L9.16602 6.85352H10.8333L10.8333 9.44949L13.416 9.44949L13.416 11.1168L9.16602 11.1168L9.16602 10.1709ZM9.99967 3.66667C6.59212 3.66667 3.66634 6.59246 3.66634 9.99999C3.66634 13.4075 6.59212 16.3333 9.99967 16.3333C13.4072 16.3333 16.333 13.4075 16.333 9.99999C16.333 6.59246 13.4072 3.66667 9.99967 3.66667Z" fill="white"/>
                </svg>
            `;
            var experienceText = document.createElement('p');
            experienceText.textContent = response.experience;
            experienceText.style.cssText = `
                color: #FFFFFF;
                font-weight: bold;
                font-size: 12px;
                display: flex;
                margin-left: 5px;
            `;
            experienceData.appendChild(experienceImage);
            experienceData.appendChild(experienceText);
            
            var sponsorData = document.createElement('div');
            sponsorData.style.cssText = `
                display: flex;
                align-items: center;
                margin-left: 5px;
            `;
            var sponsorImage = document.createElement('a');
            sponsorImage.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.2253 3.55543L16.5446 7.88103C16.6674 8.00386 16.6674 8.19982 16.5446 8.32261L12.2253 12.6482C12.0946 12.779 11.8887 12.779 11.7659 12.6482L10.4376 11.3199C10.308 11.1903 10.308 10.9807 10.4376 10.8512L12.2998 8.99982H7.66687C6.8173 8.99982 6.11687 9.70025 6.11687 10.5498V15.1832C6.11687 15.3764 5.95967 15.5336 5.76687 15.5336H4.21687C4.02407 15.5336 3.86687 15.3764 3.86687 15.1832V10.5498C3.86687 8.73911 5.45619 7.14982 7.26687 7.14982H12.2998L10.4376 5.29847C10.308 5.1689 10.308 4.95925 10.4376 4.82968L11.7659 3.50143C11.8887 3.37064 12.0946 3.37064 12.2253 3.50143Z" fill="white"/>
                </svg>
            `;
            var sponsorText = document.createElement('p');
            sponsorText.textContent = response.sponsor;
            sponsorText.style.cssText = `
                color: #FFFFFF;
                font-weight: bold;
                font-size: 12px;
                display: flex;
                margin-left: 5px;
            `;
            sponsorData.appendChild(sponsorImage);
            sponsorData.appendChild(sponsorText);
            
            var clearanceData = document.createElement('div');
            clearanceData.style.cssText = `
                display: flex;
                align-items: center;
                margin-left: 5px;
            `;
            var clearanceImage = document.createElement('a');
            clearanceImage.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2.5C5.85797 2.5 2.5 5.85797 2.5 10C2.5 12.3864 3.64589 14.515 5.46961 15.7789L5.46954 16.7093L5.46954 16.7321C5.46954 16.8327 5.4828 16.9224 5.50396 16.9985C5.54285 17.1455 5.61705 17.2834 5.72789 17.3942C5.84789 17.5142 6.00733 17.6007 6.21302 17.6631C6.42159 17.7263 6.71132 17.7596 7.10451 17.7596L12.8955 17.7596C13.2887 17.7596 13.5784 17.7263 13.787 17.6631C13.9927 17.6007 14.1521 17.5142 14.2721 17.3942C14.383 17.2834 14.4572 17.1455 14.4961 16.9985C14.5172 16.9224 14.

5305 16.8327 14.5305 16.7321L14.5305 16.7093L14.5304 15.7788C16.3541 14.5149 17.5 12.3863 17.5 10C17.5 5.85797 14.142 2.5 10 2.5ZM10 3.66667C6.59244 3.66667 3.66667 6.59244 3.66667 10C3.66667 12.1586 4.8844 14.0192 6.6861 14.9627C6.8168 15.0323 6.89554 15.1731 6.89554 15.3259L6.89554 16.5179C6.89554 16.5338 6.89828 16.5526 6.90702 16.575C6.91572 16.5972 6.92936 16.6173 6.94678 16.6294C6.96246 16.6403 6.98084 16.6462 7.10451 16.6462L12.8955 16.6462C13.0192 16.6462 13.0375 16.6403 13.0532 16.6294C13.0706 16.6173 13.0842 16.5972 13.093 16.575C13.1017 16.5526 13.1045 16.5338 13.1045 16.5179L13.1045 15.3259C13.1045 15.1731 13.1832 15.0323 13.3139 14.9627C15.1156 14.0192 16.3333 12.1586 16.3333 10C16.3333 6.59244 13.4076 3.66667 10 3.66667ZM10 6.73336C9.54182 6.73336 9.16667 7.10852 9.16667 7.5667L9.16667 10.8334C9.16667 11.2915 9.54182 11.6667 10 11.6667C10.4582 11.6667 10.8333 11.2915 10.8333 10.8334L10.8333 7.5667C10.8333 7.10852 10.4582 6.73336 10 6.73336ZM11.5 14.5C11.5 14.9604 11.0381 15.3333 10.5 15.3333C9.96186 15.3333 9.5 14.9604 9.5 14.5C9.5 14.0396 9.96186 13.6667 10.5 13.6667C11.0381 13.6667 11.5 14.0396 11.5 14.5Z" fill="white"/>
                </svg>
            `;
            var clearanceText = document.createElement('p');
            clearanceText.textContent = response.clearance;
            clearanceText.style.cssText = `
                color: #FFFFFF;
                font-weight: bold;
                font-size: 12px;
                display: flex;
                margin-left: 5px;
            `;
            clearanceData.appendChild(clearanceImage);
            clearanceData.appendChild(clearanceText);
            
            let leftBody = document.getElementById("leftBody")
            if (!leftBody) {
                return;
            }
            leftBody.innerHTML = "";
            analysisBTN.textContent = 'View';
            analysisBTN.addEventListener('click', () => {
                if (analysisBTN.textContent === 'View'){
                    analysisBTN.textContent = 'Hide';
                    leftBody.appendChild(applicantsData);
                    leftBody.appendChild(experienceData);
                    leftBody.appendChild(sponsorData);
                    leftBody.appendChild(clearanceData);
                } else {
                    analysisBTN.textContent = 'View';
                    leftBody.innerHTML = '';
                    leftBody.appendChild(analysisBTN);
                }
            });
            leftBody.appendChild(analysisBTN);
            loadAnalysisRight(response)
        })
}