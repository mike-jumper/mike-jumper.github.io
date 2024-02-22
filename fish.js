/*
 * Copyright (c) 2024 Michael Jumper
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

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

