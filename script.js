function addVariable() {
    const container = document.getElementById('variables-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'variable';
    input.placeholder = 'Enter another variable';
    container.appendChild(input);
    container.lastChild.scrollIntoView({ behavior: 'smooth' });
}

function calculateDerivative() {
    const func = document.getElementById('function').value;
    const variables = Array.from(document.getElementsByClassName('variable')).map(input => input.value);

    if (!func || variables.length === 0) {
        document.getElementById('result').innerText = 'Please enter a valid function and at least one variable.';
        return;
    }

    try {
        const expandedFunc = math.simplify(func).toString();
        let finalResult = '';

        variables.forEach(variable => {
            const derivative = math.derivative(expandedFunc, variable).toString();
            finalResult += `Derivative with respect to ${variable}: ${formatExpression(derivative)}<br>`;
        });

        document.getElementById('result').innerHTML = finalResult;
    } catch (error) {
        console.error('Calculation Error:', error);
        document.getElementById('result').innerText = `Error in calculation: ${error.message}. Please check your function and variables.`;
    }
}

function formatExpression(expression) {
    expression = expression.replace(/\*/g, '');
    expression = expression.replace(/(\w)\^(\d+)/g, function(match, base, exp) {
        return base + '<span class="superscript">' + exp + '</span>';
    });
    return expression;
}

function toggleInstructions() {
    const popup = document.getElementById('instruction-popup');
    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
}
