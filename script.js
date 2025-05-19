document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const suggestionsDropdown = document.getElementById('suggestions-dropdown');
    const searchResultsDiv = document.getElementById('search-results');
    
    // Варианты для поиска
    const searchOptions = ['Тинькофф-банк', 'ВК', 'Стим'];


    // Обновляем структуру данных с реальными и фишинговыми URL
    const searchData = {
        'Тинькофф-банк': [
            {
                title: 'Тинькофф Банк - кредитные и дебетовые карты, вклады',
                url: 'https://www.tinkoff.ru',
                realUrl: 'https://www.tinkoff.ru',
                fakeUrl: 'fake-sites/tinkoff.html',
                snippet: 'Официальный сайт Тинькофф Банка. Кредитные и дебетовые карты, вклады, кредиты и другие банковские услуги.',
                isPhishing: false,
                icon: '<i class="fas fa-piggy-bank"></i>'
            },
            {
                title: 'Тинькофф Банк - вход в личный кабинет',
                url: 'https://www.tinkoff-bank.ru',
                realUrl: 'https://www.tinkoff.ru',
                fakeUrl: 'fake-sites/tinkoff-login.html',
                snippet: 'Вход в личный кабинет Тинькофф Банка. Проверьте свои счета и карты онлайн.',
                isPhishing: true,
                icon: '<i class="fas fa-unlock-alt"></i>'
            }
        ],
        'ВК': [
            {
                title: 'ВКонтакте | Добро пожаловать',
                url: 'https://vk.com',
                realUrl: 'https://vk.com',
                fakeUrl: 'fake-sites/vk.html',
                snippet: 'ВКонтакте - универсальное средство для общения и поиска друзей и одноклассников.',
                isPhishing: false,
                icon: '<i class="fab fa-vk"></i>'
            },
            {
                title: 'ВК - вход в социальную сеть',
                url: 'https://vk-login.ru',
                realUrl: 'https://vk.com',
                fakeUrl: 'fake-sites/vk-login.html',
                snippet: 'Войдите в свою учетную запись ВКонтакте чтобы проверить сообщения.',
                isPhishing: true,
                icon: '<i class="fas fa-sign-in-alt"></i>'
            }
        ],
        'Стим': [
            {
                title: 'Steam, The Ultimate Online Game Platform',
                url: 'https://store.steampowered.com',
                realUrl: 'https://store.steampowered.com',
                fakeUrl: 'fake-sites/steam.html',
                snippet: 'Steam is the ultimate destination for playing, discussing, and creating games.',
                isPhishing: false,
                icon: '<i class="fab fa-steam"></i>'
            },
            {
                title: 'Steam Community - вход в аккаунт',
                url: 'https://steamcomminity.ru',
                realUrl: 'https://steamcommunity.com',
                fakeUrl: 'fake-sites/steam-login.html',
                snippet: 'Войдите в свой аккаунт Steam чтобы получить доступ к сообществу.',
                isPhishing: true,
                icon: '<i class="fas fa-users"></i>'
            }
        ]
    };
    
    // Показываем подсказки при фокусе на поисковой строке
    searchInput.addEventListener('focus', function() {
        showSuggestions();
    });
    
    // Скрываем подсказки при клике вне поисковой строки
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
            suggestionsDropdown.style.display = 'none';
        }
    });
    
    // Обработка ввода в поисковую строку
    searchInput.addEventListener('input', function() {
        showSuggestions();
    });
    
    // Обработка нажатия Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Обработка клика по кнопке поиска
    searchButton.addEventListener('click', function() {
        performSearch();
    });
    
    function showSuggestions() {
        suggestionsDropdown.innerHTML = '';
        
        const inputValue = searchInput.value.toLowerCase();
        const filteredOptions = searchOptions.filter(option => 
            option.toLowerCase().includes(inputValue)
        );
        
        if (filteredOptions.length === 0 || inputValue === '') {
            // Показываем все варианты, если строка пустая
            searchOptions.forEach(option => {
                addSuggestion(option);
            });
        } else {
            // Показываем только подходящие варианты
            filteredOptions.forEach(option => {
                addSuggestion(option);
            });
        }
        
        suggestionsDropdown.style.display = filteredOptions.length > 0 ? 'block' : 'none';
    }
    
    function addSuggestion(option) {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'suggestion-option';
        optionDiv.textContent = option;
        
        optionDiv.addEventListener('click', function() {
            searchInput.value = option;
            suggestionsDropdown.style.display = 'none';
            performSearch();
        });
        
        suggestionsDropdown.appendChild(optionDiv);
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        
        if (!query || !searchOptions.includes(query)) {
            alert('Пожалуйста, выберите один из предложенных вариантов');
            return;
        }
        
        suggestionsDropdown.style.display = 'none';
        showSearchResults(query);
    }
    
    // Обновляем функцию showSearchResults
    function showSearchResults(query) {
        const results = searchData[query];
        
        if (!results) {
            searchResultsDiv.innerHTML = '<p>Ничего не найдено</p>';
            return;
        }
        
        let html = '';
        
        results.forEach(result => {
            const targetUrl = result.isPhishing ? result.fakeUrl : result.realUrl;
            
            html += `
                <div class="yandex-result">
                    <div class="result-icon">${result.icon}</div>
                    <div class="result-content">
                        <a href="${targetUrl}" target="_blank" class="yandex-result-title">${result.title}</a>
                        <div class="yandex-result-url">
                            <span class="url-icon"><i class="fas fa-link"></i></span>
                            ${result.url}
                        </div>
                        <div class="yandex-result-snippet">${result.snippet}</div>
                        ${result.isPhishing ? '<div class="phishing-warning">⚠ Фишинговый сайт! Обратите внимание на доменное имя</div>' : ''}
                    </div>
                </div>
            `;
        });
        
        html += `
            <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 3px;">
                <h3 style="margin-top: 0;">Как определить фишинговый сайт?</h3>
                <ul style="margin-bottom: 0;">
                    <li>Проверяйте доменное имя - фишинговые сайты часто используют похожие, но неверные домены</li>
                    <li>Обращайте внимание на HTTPS и замок в адресной строке</li>
                    <li>Не вводите личные данные на подозрительных сайтах</li>
                </ul>
            </div>
        `;
        
        searchResultsDiv.innerHTML = html;
    }
});