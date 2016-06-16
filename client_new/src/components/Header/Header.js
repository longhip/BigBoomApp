/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';


function Header() {
  return (
    <div>
      <div className="navbar navbar-inverse navbar-lg">
        <div className="container">
          <div className="navbar-collapse collapse" id="navbar-mobile">
              <a className="navbar-brand" href="index.html"><img src="assets/images/logo_light.png" alt="" /></a>
              <ul className="nav navbar-nav pull-right visible-xs-block">
                  <li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a></li>
              </ul>
              <form className="navbar-form navbar-left">
                  <div className="form-group has-feedback">
                      <input type="search" size="70" className="form-control" placeholder="Tìm kiếm mọi thứ..." />
                      <div className="form-control-feedback">
                          <i className="icon-search4 text-muted text-size-base"></i>
                      </div>
                  </div>
              </form>
              <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/register">Đăng ký</Link></li>
                  <li><Link to="/login">Đăng nhập</Link></li>
              </ul>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
}

export default withStyles(s)(Header);
