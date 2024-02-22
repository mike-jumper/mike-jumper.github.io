var addFish = function addFish() {

    var fish = document.createElement('div');
    fish.className = 'fish';
    fish.style.setProperty('--layer', Math.floor(Math.random() * 20) + 1);
    fish.style.setProperty('--color', Math.random());
    fish.style.top = Math.random() * 100 + '%';

    document.body.appendChild(fish);
    fish.addEventListener('animationend', function removeFish() {
        fish.parentNode.removeChild(fish);
    });

};

var scheduleFish = function scheduleFish() {
    window.setTimeout(function populateFish() {
        window.requestAnimationFrame(addFish);
        scheduleFish();
    }, Math.random() * 5000);
};

for (var i = 0; i < 20; i++) {
    var water = document.createElement('div');
    water.className = 'water';
    water.style.setProperty('--layer', i);
    document.body.appendChild(water);
}

scheduleFish();

