(function () {

    var results = document.getElementById("results");
    var searchElement = document.getElementById("search");
    var key;
    var selectedResult = 0;
    var mouseIn = 0;

    function searchResult(Keywords) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', './php/search.php?s=' + encodeURIComponent(Keywords));

        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                displayResults(xhr.responseText);
            }
        }, false);

        xhr.send(null);

    }

    function displayResults(response) {
        results.style.display = response.length ? 'block' : 'none';
        selectedResult = response.length ? selectedResult : 0;
        if (response.length) {

            response = response.split('|');
            var responseLen = response.length;

            results.innerHTML = '';

            for (var i = 0, div; i < responseLen; i++) {

                div = results.appendChild(document.createElement('div'));
                div.innerHTML = response[i];

                div.addEventListener('click', function(e) {
                    chooseResult(e.target);
                }, false);

                div.addEventListener('mouseover', function(f) {
                    if (selectedResult>0){
                        divs[selectedResult].className = '';
                    }
                    f.target.className = 'selectedResult';
                    mouseIn = 1;
                }, false);

                div.addEventListener('mouseout', function(g) {
                    g.target.className = '';
                    selectedResult = 0;
                    mouseIn = 0;
                }, false);
            }

            var divs = document.getElementsByTagName('div');

            if (divs.length>1 && key== 40 && mouseIn==0) {
                if (selectedResult<divs.length-1){
                    selectedResult++;
                }
                divs[selectedResult].className = 'selectedResult';
            } else if (divs.length>1 && key== 38 && mouseIn==0) {
                if (selectedResult>1){
                    selectedResult--;
                }
                divs[selectedResult].className = 'selectedResult';
            } else if (divs.length>1 && selectedResult>1 && key == 13) {
                chooseResult(divs[selectedResult]);
                selectedResult = 0;
            }
        }
    }

    function chooseResult(result) {
        searchElement.value = result.innerHTML;
        results.style.display = 'none';
        searchElement.focus();
    }

    searchElement.addEventListener('keyup', function(e) {
        searchResult(searchElement.value);
        key = e.keyCode;
    }, false);

})();