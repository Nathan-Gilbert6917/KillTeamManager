import React from 'react'

import './ProgressBar.css';

const ProgressBar = ({numberOfSteps, currentStep}) => {

  if (currentStep >= numberOfSteps) {
    currentStep = numberOfSteps;
  } else if (currentStep <= 0) {
    currentStep = 1;
  }

  const progressPercentage = () => {
    let percentage = ((currentStep / (numberOfSteps - 1)) * 100) - (1 / (numberOfSteps - 1) * 100);
    if (percentage === 100) {
      percentage = 99;
    }
    return percentage +"%";
  }

  return (
    <div className="progress">
      <div className="progress-bar-container">
        <div className="progress-line" style={{width:progressPercentage()}}></div>
        {[...Array(numberOfSteps)].map((_, i) => {
          let step = i + 1;
          let stepClassName = 'progress-step';
          if (isNaN(currentStep) || currentStep === null || currentStep === undefined) {
            currentStep = 1;
          }
          
          if (step <= currentStep) {
            stepClassName += ' active-step';
          }

          return (
            <div className={stepClassName} key={step}></div>
          )
        })}
      </div>
    </div>
  );
}

export default ProgressBar;