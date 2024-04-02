import React, {useEffect, useState, useRef} from 'react'


const Stepper = ( { steps , currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) =>{
    const newSteps = [... steps];
    let count = 0;

    while (count < newSteps.length) {
      // current step
      if (count === stepNumber) {
        newSteps[count] ={
          ... newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }
      //step completed
      else if(count < stepNumber){
        newSteps[count] ={
          ... newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
    //step pending
      else{
        newSteps[count] ={
          ... newSteps[count],
          highlighted: false, 
          selected: false,
          completed: false,
        };
        count++;
      }
  }
  return newSteps;
};
    
  useEffect(() => {
    //create object
    const stepsState = steps.map((step, index) => 
    Object.assign({}, {
      description: step,
      completed: false,
      highlighted: index === 0 ? true : false,
      selected: index === 0 ? true : false,
    })
    );
    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep])

  const displaySteps =newStep.map((step, index) => {
    return (
        <div key ={index} 
        className= {
          index !== newStep.length -1 ? 'w-full flex items-center' : 'flex items-center'
        }
        >
          <div className='relative flex flex-col items-center text-[#00867D]'>
            <div className={`rounded-full transition duration-500 ease-in-out border-2 border-[#D1D5DB] 
            h-10 w-10 flex items-center justify-center py-3 ${step.selected ? 
              'bg-[#40cf87] text-[#FFFFFF] font-bold border border-[#0c7c3f]' : ''}`}
            >
              {/* Display number */}
              {step.completed ? (
                <span className='text-[#FFFFFF] text-xl font-bold'>&#10003;
                </span>
              ) : (
                index + 1
              )}
            </div>
            
            <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase
            ${step.highlighted ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>
              {/* Display description */}
              {step.description}
            </div>
          </div>
          
          <div className={`flex-auto border-t-2 transition duration-500 
          ease-in-out ${step.completed ? 'border-[#0c7c3f]' : 'border-[#D1D5DB]'}`}>
            {/* Display line */}
          </div>
        </div>
      );
  });

  return (
    <div className='mx-4 p-2 flex justify-between items-center'>
      {displaySteps}
    </div>
  )
}

export default Stepper
