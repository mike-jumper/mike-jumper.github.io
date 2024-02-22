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

/**
 * The maximum number of layers that fish may be stacked within. A greater
 * quantity of layers leads to greater variance in fish depth.
 */
const MAX_FISH_DEPTH = 20;

/**
 * The maximum number of milliseconds to wait before adding a new fish.
 */
const MAX_FISH_INTERVAL = 5000;

/**
 * The minimum number of milliseconds to wait before adding a new fish.
 */
const MIN_FISH_INTERVAL = 500;

/**
 * The timestamp that the last fish was added, in milliseconds since epoch
 * (midnight at the beginning of 1970-01-01, UTC).
 */
var lastFishAdded = 0;

/**
 * Adds a new fish to the set of fish currently displayed. The new fish will be
 * automatically assigned a random location, color, and depth. Once the fish
 * has swum all the way across the screen, it will be automatically removed
 * from the DOM. If insufficient time has elapsed since the last time this
 * function was called (based on MIN_FISH_INTERVAL), this function has no
 * effect.
 */
const addFish = function addFish() {

    // Do not allow fish to be added faster than MIN_FISH_INTERVAL
    let timestamp = Date.now();
    if (timestamp - lastFishAdded < MIN_FISH_INTERVAL)
        return;

    lastFishAdded = timestamp;

    let fish = document.createElement('div');
    fish.className = 'fish';
    fish.style.setProperty('--layer', Math.floor(Math.random() * MAX_FISH_DEPTH) + 1);
    fish.style.setProperty('--color', Math.random());
    fish.style.top = Math.random() * 100 + '%';

    document.body.appendChild(fish);
    fish.addEventListener('animationend', function removeFish() {
        fish.parentNode.removeChild(fish);
    });

};

/**
 * Adds a new fish after a ~5 second wait, and then continues to add new fish
 * every ~5 seconds. The delay between adding new fish is randomized.
 *
 * NOTE: There is no explicit upper bound on the number of fish, however there
 * is an implicit upper bound given that there is an upper bound for how long
 * each fish will remain in the DOM (they will eventually reach the other side
 * and be removed, and there is a maximum length of time that this can take) as
 * well as an upper bound on the number of times addFish() will have an effect
 * over the course of that time (MIN_FISH_INTERVAL).
 */
const scheduleFish = function scheduleFish() {
    window.setTimeout(function populateFish() {
        window.requestAnimationFrame(addFish);
        scheduleFish();
    }, Math.random() * (MAX_FISH_INTERVAL - MIN_FISH_INTERVAL) + MIN_FISH_INTERVAL);
};

// Add layers of water corresponding to the maximum fish depth
for (var i = 0; i < MAX_FISH_DEPTH; i++) {
    let water = document.createElement('div');
    water.className = 'water';
    water.style.setProperty('--layer', i);
    document.body.appendChild(water);
}

// Start adding fish
scheduleFish();

