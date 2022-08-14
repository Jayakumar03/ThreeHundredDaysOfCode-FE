import React, { useEffect } from "react";

import '../styles/ProblemOfDay.css'

function ProblemOfDay() {
    return (
        <div className="problem-parent-box">
        <h1 className="problem-header"> Problem Of The Day</h1>
        <div>Day 1. <a href = "https://leetcode.com/problems/add-to-array-form-of-integer/"> Add To Array-Form of Integer</a>
        <div>Complexity: Easy</div>
        </div>
        <div className="problem-desc"><p>
            The array-form of an integer num is an array representing its digits in left to right order.
            For example, for num = 1321, the array form is [1,3,2,1].
            Given num, the array-form of an integer, and an integer k, return the array-form of the integer num + k.
        </p>
        </div>
        </div>
    );
}

export default ProblemOfDay;