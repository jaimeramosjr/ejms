import React from 'react';

import { AccountDropdown } from './AccountDropdown';

export function Header()
{
  return (
    <header className="header">
			<nav className="navbar">
				<div className="container-fluid">
					<div className="navbar-holder d-flex align-items-center justify-content-between">
						<div className="navbar-header">
							<a href="/" className="navbar-brand d-none d-sm-inline-block">
								<div className="brand-text d-none d-lg-inline-block">eJMS</div>
								<div className="brand-text d-none d-sm-inline-block d-lg-none">eJMS</div>
							</a>
							{/* <a id="toggle-btn" href="#" className="menu-btn active"><span></span><span></span><span></span></a> */}
						</div>
						<AccountDropdown/>
					</div>
				</div>
			</nav>
		</header>
  );
}
