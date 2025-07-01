const unitToggle = document.getElementById('unitToggle');
const unitLabel = document.getElementById('unitLabel');

const metricInputs = document.getElementById('metricInputs');
const imperialInputs = document.getElementById('imperialInputs');

const form = document.getElementById('bmiForm');
const result = document.getElementById('result');

unitToggle.addEventListener('change', function() {
    if (unitToggle.checked) {
        unitLabel.textContent = 'Imperial (lbs/inches)';
        metricInputs.style.display = 'none';
        imperialInputs.style.display = 'block';
        document.getElementById('weightMetric').value = '';
        document.getElementById('heightMetric').value = '';
    } else {
        unitLabel.textContent = 'Metric (kg/cm)';
        metricInputs.style.display = 'block';
        imperialInputs.style.display = 'none';
        document.getElementById('weightImperial').value = '';
        document.getElementById('heightImperialFt').value = '';
        document.getElementById('heightImperialIn').value = '';
    };
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let bmi;

    if (unitToggle.checked) {
        const weightlbs = parseFloat(document.getElementById('weightImperial').value);
        const heightft = parseFloat(document.getElementById('heightImperialFt').value);
        const heightin = parseFloat(document.getElementById('heightImperialIn').value);
        const weight = weightlbs * 0.453592; // Convert lbs to kg
        const heightCm = (heightft * 12 + heightin) * 2.54; // Convert inches to cm
        const heightM = heightCm / 100;

        bmi = weight / (heightM * heightM);
        } else {
        const weight = parseFloat(document.getElementById('weightMetric').value);
        const heightCm = parseFloat(document.getElementById('heightMetric').value);
        const heightM = heightCm / 100;

        bmi = weight / (heightM * heightM);
        }
    result.textContent = `Your BMI is ${bmi.toFixed(2)}`;
});

document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.bmiBox');
  const txt = document.querySelector('.bmiTxt');

  requestAnimationFrame(() => {
    box.classList.add('show');

    setTimeout(() => {
      txt.classList.add('show');
    }, 1200);
  });
});
