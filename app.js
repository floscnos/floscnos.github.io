// Hardcoded data:

const sheeps = [
    {
        'name': 'Maasduinschapen',
        'category': 'Ruischapen',
        'likes': 18,
        'img': 'img/maasduinschapen.jpg',
    },
    {
        'name': 'Nolana schapen',
        'category': 'Ruischapen',
        'likes': 12,
        'img': 'img/nolanaschapen.jpg',
    },
    {
        'name': 'Bruin haarschaap',
        'category': 'Ruischapen',
        'likes': 11,
        'img': 'img/bruihaarschaap.jpg',
    },
    {
        'name': 'Fries Melkschaap',
        'category': 'Melkschapen',
        'likes': 10,
        'img': 'img/friesmelkschaap.jpg',
    },
    {
        'name': 'Belgisch Melkschaap',
        'category': 'Melkschapen',
        'likes': 9,
        'img': 'img/belgischmelkschaap.png',
    },
    {
        'name': 'Zwartblesschaap',
        'category': 'Vleesrassen',
        'likes': 8,
        'img': 'img/zwartblesschaap.jpg',
    },
    {
        'name': 'Texelaar',
        'category': 'Vleesrassen',
        'likes': 7,
        'img': 'img/texelaar.jpg',
    },
    {
        'name': 'Swifters',
        'category': 'Vleesrassen',
        'likes': 6,
        'img': 'img/swifter.jpg',
    },
    {
        'name': 'Flevolander',
        'category': 'Vleesrassen',
        'likes': 5,
        'img': 'img/flevolander.jpg',
    },
    {
        'name': 'Blauwe Texelaar',
        'category': 'Vleesrassen',
        'likes': 4,
        'img': 'img/blauwetexelaar.jpg',
    },
    {
        'name': 'Noordhollander',
        'category': 'Vleesrassen',
        'likes': 3,
        'img': 'img/noordhollander.jpg',
    },
    {
        'name': 'Ardense Voskop',
        'category': 'Buitenlandse rassen',
        'likes': 2,
        'img': 'img/ardensevoskop.jpg',
    },
    {
        'name': 'Ouessant',
        'category': 'Buitenlandse rassen',
        'likes': 1,
        'img': 'img/ouessant.jpg',
    }
]

let sortedSheeps = sheeps;

const categories = [
    {
        'name': 'Ruischapen',
        'state': true,
    },
    {
        'name': 'Melkschapen',
        'state': true,
    },
    {
        'name': 'Vleesrassen',
        'state': true,
    },
    {
        'name': 'Buitenlandse rassen',
        'state': true,
    },
]

var sheepsToRender = [];
var activePage = 1;

// Functions:

const renderSheeps = function () {
    sheepsToRender = [...sortedSheeps];

    const categories = getCategoryFilterValues();
    sheepsToRender = sheepsToRender.filter(sheep => categories.includes(sheep['category']))

    let pages = sheepsToRender.length / 6 + 1;
    renderPageButtons(pages);

    renderPage(1)
}

function updateCategories(e) {
    let category = categories.find(x => x.name === e.id.split('-cb')[0]);

    category['state'] = !category['state'];

    document.getElementById(category['name'] + "-cb").checked = category['state'];
    document.getElementById(category['name'] + "-cb-mobile").checked = category['state'];

    renderSheeps();
}

let pageButtons = null;

const renderPageButtons = function (pages) {
    let pagesContainer = document.getElementById("pages");
    pagesContainer.innerHTML = ""

    for (let i = 1; i <= pages; i++) {
        pagesContainer.innerHTML += `
                <span id="page-link-${i}" class="page-link" page="${i}" onclick="changePage(${i})">${i}</span>
            `
    }

    pageButtons = document.getElementsByClassName("page-link");
}

const cardContainer = document.getElementById("card-container")

const renderCategoryFilters = function (categories) {
    const categoriesFilterList = document.getElementById("category-filter-list");
    const categoriesFilterListMobile = document.getElementById("category-filter-list-mobile");

    categories.forEach(category => {
        const html =

        categoriesFilterList.innerHTML += `
                <input class="category-filter-cb" id="${category['name']}-cb" type="checkbox" name="${category['name']}" onclick="updateCategories(this)" checked />
                <label for="${category['name']}-cb">${category['name']}</label><br>
            `;
        categoriesFilterListMobile.innerHTML += `
                <input class="category-filter-cb" id="${category['name']}-cb-mobile" type="checkbox" name="${category['name']}-mobile" onclick="updateCategories(this)" checked />
                <label for="${category['name']}-cb-mobile">${category['name']}</label><br>
            `;
    })
}

renderCategoryFilters(categories)

const getCategoryFilterValues = function () {
    let filterCategories = document.getElementsByClassName("category-filter-cb");

    let res = [];
    for (let filterCategory of filterCategories) {
        if (filterCategory.checked) {
            res.push(filterCategory.name);
        }
    }
    return res;
}

const changePage = function (page) {
    activePage = page;

    renderPage(page);
}

const updateActivePageStyles = function (page) {
    for (let pageButton of pageButtons) {
        pageButton.classList = 'page-link';
    }
    let activePageButton = pageButtons[page-1];
    activePageButton.classList += ' page-link-active';

    document.title = `${page} | Schapencollectie`;
}

const renderPage = function (page) {
    cardContainer.innerHTML = "";

    for (let i = page * 6 - 6; i < page * 6; i++) {
        sheep = sheepsToRender[i];

        if (sheep == null) {
            break
        }

        cardContainer.innerHTML += `<div class="card">
                <img src="${sheep['img']}">
                <div class="card-subcontent">
                    <div>
                        <h1 class="card-title">${sheep["name"]}</h1>
                        <p class="category-title">${sheep["category"]}</p>
                    </div>
                    <div>
                        <i class="fa-regular fa-thumbs-up fa-xl like-button" onclick="likeSheep(this)" sheep="${sheep['name']}"></i> ${sheep["likes"]}
                    </div>
                </div>
            </div>`

        cardContainer.innerHTML +=
            '</div>' +
            '</div>'
    }
    updateActivePageStyles(page);
}

renderSheeps();

let mobileSidebarState = false;

const showMobileSidebar = function () {
    const mobileSidebar = document.getElementById("mobile-sidebar");
    const cover = document.getElementById("cover");

    if (mobileSidebarState == true)
    {
        mobileSidebar.style.cssText = "";
        cover.style.cssText = "";
        mobileSidebarState = false;
    } else {
        mobileSidebar.style.cssText = "left: 0px;";
        cover.style.cssText = "display: block";
        mobileSidebarState = true;
    }
}


const sortDefault = function () {
    sortedSheeps = [...sheeps];
    renderSheeps();
}

const sortByNameAsc = function () {
    sortedSheeps = [...sheeps];
    sortedSheeps.sort((a, b) => (a.name > b.name) ? 1 : -1)
    renderSheeps();
}

const sortByNameDesc = function () {
    sortedSheeps = [...sheeps];
    sortedSheeps.sort((a, b) => (a.name < b.name) ? 1 : -1)
    renderSheeps();
}

const sortByLikesAsc = function () {
    sortedSheeps = [...sheeps];
    sortedSheeps.sort(function (a, b) {
        return a['likes'] - b['likes'];
    })

    renderSheeps();
}

const sortByLikesDesc = function () {
    sortedSheeps = [...sheeps];
    sortedSheeps.sort(function (a, b) {
        return b['likes'] - a['likes'];
    })

    renderSheeps();
}

const sortOptions = {
    'default': {
        'label': 'Selecteer een optie...',
        'function': sortDefault,
    },
    'likesAsc': {
        'label': 'Likes - oplopend',
        'function': sortByLikesAsc,
    },
    'likesDesc': {
        'label': 'Likes - aflopend',
        'function': sortByLikesDesc,
    },
    'nameAsc': {
        'label': 'Naam - oplopend',
        'function': sortByNameAsc,
    },
    'nameDesc': {
        'label': 'Naam - aflopend',
        'function': sortByNameDesc,
    }
}

const renderSortingOptions = function (sortOptions) {
    const sortSelect = document.getElementById("sort-select");
    const sortSelectMobile = document.getElementById("sort-select-mobile");
    sortSelect.innerHTML = "";
    sortSelectMobile.innerHTML = "";
    for (const [key, details] of Object.entries(sortOptions)) {
        const html = `<option value="${key}">${details['label']}</option>`
        sortSelect.innerHTML += html;
        sortSelectMobile.innerHTML += html;
    }
}

renderSortingOptions(sortOptions)

document.getElementById("sort-select").addEventListener('change', function (e) {
    let sort = sortOptions[e.target.value].function;
    sort();
    document.getElementById("sort-select-mobile").value = e.target.value;
}, false)

document.getElementById("sort-select-mobile").addEventListener('change', function (e) {
    let sort = sortOptions[e.target.value].function;
    sort();
    document.getElementById("sort-select").value = e.target.value;
}, false)

const likeSheep = function (e) {
    const sheep = sheeps.find(x => x.name === e.getAttribute('sheep'));

    sheep['likes']++

    renderPage(activePage);
}