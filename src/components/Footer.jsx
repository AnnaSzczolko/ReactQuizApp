import React from 'react'
import githubIcon from '../img/github.png'
import linkedinIcon from '../img/linkedin.png'

export default function Footer() {
	return (
		<div className="footer">
			<div className="footer__box">
				<a className="footer__link" target="_blank" href="https://github.com/AnnaSzczolko?tab=repositories">
					<img className="footer__icon" src={githubIcon} alt="github icon" />
				</a>
				<a className="footer__link" target="_blank" href="https://www.linkedin.com/in/anna-szczo%C5%82ko-7b0491314/">
					<img className="footer__icon" src={linkedinIcon} alt="linkedin icon" />
				</a>
			</div>
			<p className="footer__description">Created By Anna Szczołko</p>
		</div>
	)
}
