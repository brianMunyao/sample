import React, { useEffect, useState } from 'react';
import {
	FaBackspace,
	FaDivide,
	FaEquals,
	FaMinus,
	FaPlus,
	FaTimes,
} from 'react-icons/fa';
import '../styles/Calculator.css';

const Calculator = () => {
	const [input, setInput] = useState('0');
	const [output, setOutput] = useState('0');

	useEffect(() => {
		console.log(input, output);
	}, [input, output]);

	const renderOpBtn = (lbl, op, cls) => {
		const handleClick = () => {
			let tempInput = input;

			switch (op) {
				case 'clear':
					setInput('0');
					break;
				case 'del':
					tempInput = tempInput.slice(0, -1);
					if (tempInput === '') {
						setInput('0');
					} else {
						setInput(tempInput);
					}
					break;
				case '=':
					setInput('0');
					computeOp();
					break;
				case '*':
					tempInput =
						input === '0' ? (output === '0' ? '' : output) : input;
					setInput(tempInput);
					if (tempInput.includes(op + op)) return;
					tempInput += op;
					setInput(tempInput);
					break;
				default:
					// %, /, -, +
					tempInput =
						input === '0' ? (output === '0' ? '' : output) : input;
					setInput(tempInput);
					if (tempInput.includes(op)) return;
					tempInput += op;
					setInput(tempInput);
					break;
			}
		};

		if (cls === '') {
			return (
				<span className="calc-op calc-equals" onClick={handleClick}>
					{lbl}
				</span>
			);
		}
		return (
			<span className="calc-op" onClick={handleClick}>
				{lbl}
			</span>
		);
	};

	const renderDigitBtn = (lbl, special) => {
		const handleClick = () => {
			let tempInput = input === '0' ? '' : input;
			if (special === '') {
				if (tempInput.includes('.')) return;

				if (tempInput === '') {
					tempInput = '0.';
				}
			} else {
				setInput(tempInput);
				tempInput += lbl;
			}

			setInput(tempInput);
		};

		return (
			<span className="calc-digit" onClick={handleClick}>
				{lbl}
			</span>
		);
	};

	const computeOp = () => {
		try {
			let tempRes = eval(input);
			tempRes = Math.round(tempRes * 10000) / 10000;

			setOutput(tempRes.toString());
		} catch (e) {
			console.log('Invalid input string');
		}
	};

	return (
		<div className="calc-container">
			<div className="calc-inner">
				<p className="calc-logo">ARITHMIO</p>

				<div className="calc-main">
					<div className="calc-output">
						<div className="calc-output-output">
							{output.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</div>
						<div className="calc-output-input">
							{input.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</div>
					</div>
					<div className="calc-input">
						{renderOpBtn('C', 'clear')}
						{renderOpBtn('%', '%')}
						{renderOpBtn(<FaDivide />, '/')}
						{renderOpBtn(<FaTimes />, '*')}
						{renderDigitBtn('7')}
						{renderDigitBtn('8')}
						{renderDigitBtn('9')}
						{renderOpBtn(<FaMinus />, '-')}
						{renderDigitBtn('4')}
						{renderDigitBtn('5')}
						{renderDigitBtn('6')}
						{renderOpBtn(<FaPlus />, '+')}
						{renderDigitBtn('1')}
						{renderDigitBtn('2')}
						{renderDigitBtn('3')}
						{renderOpBtn(<FaEquals />, '=', '')}
						{renderDigitBtn('.', '')}
						{renderDigitBtn('0')}
						{renderOpBtn(<FaBackspace />, 'del')}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calculator;
