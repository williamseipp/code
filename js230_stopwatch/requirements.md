Create a stopwatch application

## The Timer

The stopwatch timer should have four 2-digit counters:

    hours (00-99)
    minutes (00-59)
    seconds (00-59)
    centiseconds (00-99)

All counters should use a leading zero when the corresponding time value is less than 10.

Note that one centisecond is 1/100th of a second or 10 milliseconds.

## The Controls

The stopwatch should have the following controls:

    a Start/Stop button
    a Reset button

## Functionality

When the user clicks the Start button:

    The text on the button changes to Stop.
    The timer starts running the centiseconds counter.
    When the centiseconds counter reaches 100, it resets to zero and the seconds counter starts incrementing.
    When the seconds counter reaches 60, it resets to zero and the minutes counter starts incrementing.
    When the minutes counter reaches 60, it resets to zero and the hour counter starts incrementing.

When the user clicks the Stop button:

    The timer stops.
    The button text changes to Start.

When the user clicks the Reset button:

    The timer stops running if it is already running.
    The timer resets all counters to 00.
