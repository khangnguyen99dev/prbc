export const STYLE_LAZY_LOAD = `
    @-webkit-keyframes fadeInDown {
		0% {
			opacity: 0;
			-webkit-transform: translateY(-20px);
			transform: translateY(-20px);
		}

		100% {
			opacity: 1;
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
	}

	@keyframes fadeInDown {
		0% {
			opacity: 0;
			-webkit-transform: translateY(-20px);
			-ms-transform: translateY(-20px);
			transform: translateY(-20px);
		}

		100% {
			opacity: 1;
			-webkit-transform: translateY(0);
			-ms-transform: translateY(0);
			transform: translateY(0);
		}
	}

	@-webkit-keyframes fadeInUp {
		0% {
			opacity: 0;
			-webkit-transform: translateY(20px);
			transform: translateY(20px);
		}

		100% {
			opacity: 1;
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
	}

	@keyframes fadeInUp {
		0% {
			opacity: 0;
			-webkit-transform: translateY(20px);
			-ms-transform: translateY(20px);
			transform: translateY(20px);
		}

		100% {
			opacity: 1;
			-webkit-transform: translateY(0);
			-ms-transform: translateY(0);
			transform: translateY(0);
		}
	}

	@-webkit-keyframes bounceIn {
		0% {
			opacity: 0;
			-webkit-transform: scale(0.3);
			transform: scale(0.3);
		}

		50% {
			opacity: 1;
			-webkit-transform: scale(1.05);
			transform: scale(1.05);
		}

		70% {
			-webkit-transform: scale(0.9);
			transform: scale(0.9);
		}

		100% {
			opacity: 1;
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}

	@keyframes bounceIn {
		0% {
			opacity: 0;
			-webkit-transform: scale(0.3);
			-ms-transform: scale(0.3);
			transform: scale(0.3);
		}

		50% {
			opacity: 1;
			-webkit-transform: scale(1.05);
			-ms-transform: scale(1.05);
			transform: scale(1.05);
		}

		70% {
			-webkit-transform: scale(0.9);
			-ms-transform: scale(0.9);
			transform: scale(0.9);
		}

		100% {
			opacity: 1;
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}

	@-webkit-keyframes fadeInRight {
		0% {
			opacity: 0;
			-webkit-transform: translateX(20px);
			transform: translateX(20px);
		}

		100% {
			opacity: 1;
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
	}

	@keyframes fadeInRight {
		0% {
			opacity: 0;
			-webkit-transform: translateX(40px);
			-ms-transform: translateX(40px);
			transform: translateX(40px);
		}

		100% {
			opacity: 1;
			-webkit-transform: translateX(0);
			-ms-transform: translateX(0);
			transform: translateX(0);
		}
	}

	@-webkit-keyframes pulse {
		0% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		50% {
			-webkit-transform: scale(1.1);
			transform: scale(1.1);
		}

		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}

	@keyframes pulse {
		0% {
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}

		50% {
			-webkit-transform: scale(1.1);
			-ms-transform: scale(1.1);
			transform: scale(1.1);
		}

		100% {
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}

	@-webkit-keyframes bounce {

		0%,
		100%,
		20%,
		50%,
		80% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		40% {
			-webkit-transform: translateY(-30px);
			transform: translateY(-30px);
		}

		60% {
			-webkit-transform: translateY(-15px);
			transform: translateY(-15px);
		}
	}

	@keyframes bounce {

		0%,
		100%,
		20%,
		50%,
		80% {
			-webkit-transform: translateY(0);
			-ms-transform: translateY(0);
			transform: translateY(0);
		}

		40% {
			-webkit-transform: translateY(-30px);
			-ms-transform: translateY(-30px);
			transform: translateY(-30px);
		}

		60% {
			-webkit-transform: translateY(-15px);
			-ms-transform: translateY(-15px);
			transform: translateY(-15px);
		}
	}

	@-webkit-keyframes fadeInLeft {
		0% {
			opacity: 0;
			-webkit-transform: translateX(-20px);
			transform: translateX(-20px);
		}

		100% {
			opacity: 1;
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
	}

	@keyframes fadeInLeft {
		0% {
			opacity: 0;
			-webkit-transform: translateX(-20px);
			-ms-transform: translateX(-20px);
			transform: translateX(-20px);
		}

		100% {
			opacity: 1;
			-webkit-transform: translateX(0);
			-ms-transform: translateX(0);
			transform: translateX(0);
		}
	}

	@-webkit-keyframes tada {
		0% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		10%,
		20% {
			-webkit-transform: scale(0.9) rotate(-3deg);
			transform: scale(0.9) rotate(-3deg);
		}

		30%,
		50%,
		70%,
		90% {
			-webkit-transform: scale(1.1) rotate(3deg);
			transform: scale(1.1) rotate(3deg);
		}

		40%,
		60%,
		80% {
			-webkit-transform: scale(1.1) rotate(-3deg);
			transform: scale(1.1) rotate(-3deg);
		}

		100% {
			-webkit-transform: scale(1) rotate(0);
			transform: scale(1) rotate(0);
		}
	}

	@keyframes tada {
		0% {
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}

		10%,
		20% {
			-webkit-transform: scale(0.9) rotate(-3deg);
			-ms-transform: scale(0.9) rotate(-3deg);
			transform: scale(0.9) rotate(-3deg);
		}

		30%,
		50%,
		70%,
		90% {
			-webkit-transform: scale(1.1) rotate(3deg);
			-ms-transform: scale(1.1) rotate(3deg);
			transform: scale(1.1) rotate(3deg);
		}

		40%,
		60%,
		80% {
			-webkit-transform: scale(1.1) rotate(-3deg);
			-ms-transform: scale(1.1) rotate(-3deg);
			transform: scale(1.1) rotate(-3deg);
		}

		100% {
			-webkit-transform: scale(1) rotate(0);
			-ms-transform: scale(1) rotate(0);
			transform: scale(1) rotate(0);
		}
	}

	@-webkit-keyframes wobble {
		0% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}

		15% {
			-webkit-transform: translateX(-25%) rotate(-5deg);
			transform: translateX(-25%) rotate(-5deg);
		}

		30% {
			-webkit-transform: translateX(20%) rotate(3deg);
			transform: translateX(20%) rotate(3deg);
		}

		45% {
			-webkit-transform: translateX(-15%) rotate(-3deg);
			transform: translateX(-15%) rotate(-3deg);
		}

		60% {
			-webkit-transform: translateX(10%) rotate(2deg);
			transform: translateX(10%) rotate(2deg);
		}

		75% {
			-webkit-transform: translateX(-5%) rotate(-1deg);
			transform: translateX(-5%) rotate(-1deg);
		}

		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
	}

	@keyframes wobble {
		0% {
			-webkit-transform: translateX(0);
			-ms-transform: translateX(0);
			transform: translateX(0);
		}

		15% {
			-webkit-transform: translateX(-25%) rotate(-5deg);
			-ms-transform: translateX(-25%) rotate(-5deg);
			transform: translateX(-25%) rotate(-5deg);
		}

		30% {
			-webkit-transform: translateX(20%) rotate(3deg);
			-ms-transform: translateX(20%) rotate(3deg);
			transform: translateX(20%) rotate(3deg);
		}

		45% {
			-webkit-transform: translateX(-15%) rotate(-3deg);
			-ms-transform: translateX(-15%) rotate(-3deg);
			transform: translateX(-15%) rotate(-3deg);
		}

		60% {
			-webkit-transform: translateX(10%) rotate(2deg);
			-ms-transform: translateX(10%) rotate(2deg);
			transform: translateX(10%) rotate(2deg);
		}

		75% {
			-webkit-transform: translateX(-5%) rotate(-1deg);
			-ms-transform: translateX(-5%) rotate(-1deg);
			transform: translateX(-5%) rotate(-1deg);
		}

		100% {
			-webkit-transform: translateX(0);
			-ms-transform: translateX(0);
			transform: translateX(0);
		}
	}

	@-webkit-keyframes bounceInLeft {
		0% {
			opacity: 0;
			-webkit-transform: translateX(-2000px);
			transform: translateX(-2000px);
		}

		60% {
			opacity: 1;
			-webkit-transform: translateX(30px);
			transform: translateX(30px);
		}

		80% {
			-webkit-transform: translateX(-10px);
			transform: translateX(-10px);
		}

		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
	}

	@keyframes bounceInLeft {
		0% {
			opacity: 0;
			-webkit-transform: translateX(-2000px);
			-ms-transform: translateX(-2000px);
			transform: translateX(-2000px);
		}

		60% {
			opacity: 1;
			-webkit-transform: translateX(30px);
			-ms-transform: translateX(30px);
			transform: translateX(30px);
		}

		80% {
			-webkit-transform: translateX(-10px);
			-ms-transform: translateX(-10px);
			transform: translateX(-10px);
		}

		100% {
			-webkit-transform: translateX(0);
			-ms-transform: translateX(0);
			transform: translateX(0);
		}
	}

	@-webkit-keyframes bounceInRight {
		0% {
			opacity: 0;
			-webkit-transform: translateX(2000px);
			transform: translateX(2000px);
		}

		60% {
			opacity: 1;
			-webkit-transform: translateX(-30px);
			transform: translateX(-30px);
		}

		80% {
			-webkit-transform: translateX(10px);
			transform: translateX(10px);
		}

		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
	}

	@keyframes bounceInRight {
		0% {
			opacity: 0;
			-webkit-transform: translateX(2000px);
			-ms-transform: translateX(2000px);
			transform: translateX(2000px);
		}

		60% {
			opacity: 1;
			-webkit-transform: translateX(-30px);
			-ms-transform: translateX(-30px);
			transform: translateX(-30px);
		}

		80% {
			-webkit-transform: translateX(10px);
			-ms-transform: translateX(10px);
			transform: translateX(10px);
		}

		100% {
			-webkit-transform: translateX(0);
			-ms-transform: translateX(0);
			transform: translateX(0);
		}
	}

	[data-hint]:after {
		content: attr(data-hint);
		text-align: center;
		white-space: nowrap;
		z-index: 9999;
		background: #292929;
		padding: 3px 7px;
		border-radius: 2px;
		color: white;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
	}

	[data-hint]:after,
	[data-hint]:before {
		display: inline-block;
		pointer-events: none;
		position: absolute;
		visibility: hidden;
	}

	[data-hint]:hover:after,
	[data-hint]:hover:before {
		visibility: visible;
	}

	[data-hint]:before {
		content: "";
		border: 5px solid transparent;
		z-index: 9998;
	}

	.hint-persist:before,
	.hint-persist:after {
		visibility: visible;
	}

	@media only screen and (max-width: 768px) {

		[class*="hint-"][class*="-mobile"]:after,
		[class*="hint-"][class*="-mobile"]:before {
			display: none;
		}
	}

	.hint-d-short:hover:after,
	.hint-d-short:hover:before {
		-webkit-transition: visibility 0s 0.3s ease;
		transition: visibility 0s 0.3s ease;
	}

	[class*="hint-fade"][class*="-d-short"]:hover:before,
	[class*="hint-fade"][class*="-d-short"]:hover:after,
	[class*="hint-anim"][class*="-d-short"]:hover:before,
	[class*="hint-anim"][class*="-d-short"]:hover:after {
		-webkit-transition-delay: 0.3s;
		transition-delay: 0.3s;
	}

	[class*="hint-fade"]:before,
	[class*="hint-fade"]:after {
		-webkit-transition: opacity 0.2s ease-out, visibility 0.2s ease-out;
		transition: opacity 0.2s ease-out, visibility 0.2s ease-out;
		opacity: 0;
	}

	[class*="hint-fade"]:hover:before,
	[class*="hint-fade"]:hover:after {
		opacity: 1;
	}

	[class*="hint-"][class*="-s-small"]:after {
		max-width: 200px;
		width: -webkit-max-content;
		width: -moz-max-content;
		width: max-content;
		white-space: normal;
	}

	[class*="hint-top"]:before {
		border-top-color: #292929;
		bottom: 100%;
		margin-bottom: 0px;
	}

	[class*="hint-top"]:after {
		bottom: 100%;
		margin-bottom: 10px;
	}

	[class*="hint-anim"][class*="hint-top"]:after,
	[class*="hint-anim"][class*="hint-top"]:before {
		bottom: 125%;
		opacity: 0;
		-webkit-transition: opacity 0.3s ease-out, visibility 0.3s ease-out, bottom 0.3s ease-out;
		transition: opacity 0.3s ease-out, visibility 0.3s ease-out, bottom 0.3s ease-out;
	}

	[class*="hint-anim"][class*="hint-top"]:hover:after,
	[class*="hint-anim"][class*="hint-top"]:hover:before {
		opacity: 1;
		bottom: 100%;
	}

	[class*="hint-top-middle"]:before {
		right: 50%;
		margin-right: -5px;
	}

	[class*="hint-top-middle"]:after {
		left: 50%;
		-webkit-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	[class*="hint-bottom"]:before {
		border-bottom-color: #292929;
		top: 100%;
		margin-top: 0px;
	}

	[class*="hint-bottom"]:after {
		margin-top: 10px;
		top: 100%;
	}

	[class*="hint-anim"][class*="hint-bottom"]:after,
	[class*="hint-anim"][class*="hint-bottom"]:before {
		top: 125%;
		opacity: 0;
		-webkit-transition: opacity 0.3s ease, visibility 0.3s ease, top 0.3s ease;
		transition: opacity 0.3s ease, visibility 0.3s ease, top 0.3s ease;
	}

	[class*="hint-anim"][class*="hint-bottom"]:hover:after,
	[class*="hint-anim"][class*="hint-bottom"]:hover:before {
		top: 100%;
		opacity: 1;
	}

	[class*="hint-bottom-middle"]:before {
		right: 50%;
		margin-right: -5px;
	}

	[class*="hint-bottom-middle"]:after {
		left: 50%;
		-webkit-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		transform: translateX(-50%);
	}
`;