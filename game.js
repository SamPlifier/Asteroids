(function gameSetup() {
    'use strict';
    //attach html element with id ship to var ship
    var ship = document.getElementById('ship');

    // Create your "ship" object and any other variables you might need...
    var shipObj = {
        serenity: ship,
        velocity: 0,
        angle: 0,
        xCoord: null,
        yCoord: null
    };

    // initial position
    //centered ship by documentElement width & height
    ship.style.left = document.documentElement.clientWidth/2 + "px";
    ship.style.top = document.documentElement.clientWidth/2 + "px";

    var allAsteroids = [];
    ship.addEventListener('asteroidDetected', function(event) {
        // You can detect when a new asteroid appears with this event.
        // The new asteroid's HTML element will be in:  event.detail

        // What might you need/want to do in here?
        // console.log(event.detail);
        //added new asteroids to array
        allAsteroids.push(event.detail);

    });

    /**
     * Use this function to handle when a key is pressed. Which key? Use the
     * event.keyCode property to know:
     *
     * 37 = left
     * 38 = up
     * 39 = right
     * 40 = down
     *
     * @param  {Event} event   The "keyup" event object with a bunch of data in it
     * @return {void}          In other words, no need to return anything
     */

    function handleKeys(event) {
        switch (event.keyCode) {
            case 37:
                //rotate anti-clockwise 30deg...yep, went English on this one
                shipObj.angle -= 30;
                break;
            case 39:
                //rotate clockwise 30deg
                shipObj.angle += 30;
                break;
            case 38:
                // increase velocity by 1
                shipObj.velocity += 1;
                break;
            case 40:
                //if velocity > 0, decrement by 1
                if (shipObj.velocity > 0) {
                    shipObj.velocity -= 1;
                }
                break;
        }
        // Implement me!
    }
    document.querySelector('html').addEventListener('keydown', handleKeys);

    /**
     * This is the primary "game loop"... in traditional game development, things
     * happen in a loop like this. This function will execute every 20 milliseconds
     * in order to do various things. For example, this is when all game entities
     * (ships, etc) should be moved, and also when things like hit detection happen.
     *
     * @return {void}
     */
    function gameLoop() {

        // This function for getting ship movement is given to you (at the bottom).
        // NOTE: you will need to change these arguments to match your ship object!
        // What does this function return? What will be in the `move` variable?
        // Read the documentation!
        var move = getShipMovement(shipObj.velocity, shipObj.angle);

        shipObj.serenity.style.left = xAxis;
        shipObj.serenity.style.top = yAxis;
        shipObj.serenity.style.transform = 'rotate(' + shipObj.angle + 'deg)';
        
        // Move the ship here!
var xAxis = parseInt(shipObj.serenity.style.left) + move.left + 'px';
var yAxis = parseInt(shipObj.serenity.style.top) - move.top + 'px';
        // Time to check for any collisions (see below)...
        checkForCollisions();
    }

    /**
     * This function checks for any collisions between asteroids and the ship.
     * If a collision is detected, the crash method should be called with the
     * asteroid that was hit:
     *    crash(someAsteroidElement);
     *
     * You can get the bounding box of an element using:
     *    someElement.getBoundingClientRect();
     *
     * A bounding box is an object with top, left, width, and height properties
     * that you can use to detect whether one box is on top of another.
     *
     * @return void
     */
    function checkForCollisions() {
        ////////////////////
        // console.log(allAsteroids);
        var shipBoundary = shipObj.serenity.getBoundingClientRect();

        var shipTopSide = shipBoundary.top;
        var shipRightSide = shipBoundary.right;
        var shipBottomSide = shipBoundary.bottom;
        var shipLeftSide = shipBoundary.left;
        var shipWidth = shipBoundary.width;
        var shipHeight = shipBoundary.height;
        ////////////////////
        for (var i = 0; i < allAsteroids.length; i++) {
            var allAsteroidEdges = allAsteroids[i].getBoundingClientRect();
            var asteroidLeft = allAsteroidEdges.left;
            var asteroidRight = allAsteroidEdges.right;
            var asteroidTop = allAsteroidEdges.top;
            var asteroidBottom = allAsteroidEdges.bottom;
            // console.log(shipTopSide);
            if (shipTopSide <= asteroidBottom &&
                shipBottomSide <= asteroidTop &&
                shipRightSide >= asteroidLeft &&
                shipLeftSide <= asteroidRight) {
                crash(allAsteroids[i]);
            }
        }
        // Implement me!

    }


    /**
     * This event handler will execute when a crash occurs
     *
     * return {void}
     */
    document.querySelector('main').addEventListener('crash', function() {
        console.log('You were not a leaf on the wind...');

        // What might you need/want to do in here?

    });



    /** ************************************************************************
     *             These functions and code are given to you.
     *
     *                   !!! DO NOT EDIT BELOW HERE !!!
     ** ************************************************************************/

    var loopHandle = setInterval(gameLoop, 20);

    /**
     * Executes the code required when a crash has occurred. You should call
     * this function when a collision has been detected with the asteroid that
     * was hit as the only argument.
     *
     * @param  {HTMLElement} asteroidHit The HTML element of the hit asteroid
     * @return {void}
     */
    function crash(asteroidHit) {
        document.querySelector('body').removeEventListener('keyup', handleKeys);
        asteroidHit.classList.add('hit');
        document.querySelector('#ship').classList.add('crash');

        var event = new CustomEvent('crash', {
            detail: asteroidHit
        });
        document.querySelector('main').dispatchEvent(event);
    }

    /**
     * Get the change in ship position (movement) given the current velocity
     * and angle the ship is pointing.
     *
     * @param  {Number} velocity The current speed of the ship (no units)
     * @param  {Number} angle    The angle the ship is pointing (no units)
     * @return {Object}          The amount to move the ship by with regard to left and top position (object with two properties)
     */
    function getShipMovement(velocity, angle) {
        return {
            left: (velocity * Math.sin(angle * Math.PI / 180)),
            top: (velocity * Math.cos(angle * Math.PI / 180))
        };
    }

})();
