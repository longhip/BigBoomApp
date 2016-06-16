/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

// function Navigation({ className }) {
//   return (
//     <div className={cx(s.root, className)} role="navigation">
//       <Link className={s.link} to="/about">About</Link>
//       <Link className={s.link} to="/contact">Contact</Link>
//       <span className={s.spacer}> | </span>
//       <Link className={s.link} to="/login">Log in</Link>
//       <span className={s.spacer}>or</span>
//       <Link className={cx(s.link, s.highlight)} to="/register">Sign up</Link>
//     </div>
//   );
// }

function Navigation() {
  return (
    <div className="navbar navbar-default" id="navbar-second">
      <ul className="nav navbar-nav no-border visible-xs-block">
          <li><a className="text-center collapsed" data-toggle="collapse" data-target="#navbar-second-toggle"><i className="icon-menu7"></i></a></li>
      </ul>
      <div className="container">
          <div className="navbar-collapse collapse" id="navbar-second-toggle">
              <ul className="nav navbar-nav">
                  <li className="active"><a><i className="icon-display4 position-left"></i> Dashboard</a></li>
                  <li className="dropdown mega-menu mega-menu-wide">
                    <a className="dropdown-toggle" data-toggle="dropdown"><i className="icon-puzzle4 position-left"></i> Components <span className="caret"></span></a>
                    <div className="dropdown-menu dropdown-content">
                        <div className="dropdown-content-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <span className="menu-heading underlined">Store</span>
                                    <ul className="menu-list">
                                        <li>
                                            <a href="index.htm#"><i className="icon-pencil3"></i> Form components</a>
                                            <ul>
                                                <li><a href="form_inputs_basic.html">Basic inputs</a></li>
                                                <li><a href="form_checkboxes_radios.html">Checkboxes &amp; radios</a></li>
                                                <li>
                                                    <a href="index.htm#">Selects</a>
                                                    <ul>
                                                        <li><a href="form_select2.html">Select2 selects</a></li>
                                                        <li><a href="form_multiselect.html">Bootstrap multiselect</a></li>
                                                        <li><a href="form_select_box_it.html">SelectBoxIt selects</a></li>
                                                        <li><a href="form_bootstrap_select.html">Bootstrap selects</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-footprint"></i> Wizards</a>
                                            <ul>
                                                <li><a href="wizard_steps.html">Steps wizard</a></li>
                                                <li><a href="wizard_form.html">Form wizard</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-spell-check"></i> Editors</a>
                                            <ul>
                                                <li><a href="editor_summernote.html">Summernote editor</a></li>
                                                <li><a href="editor_ckeditor.html">CKEditor</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-select2"></i> Pickers</a>
                                            <ul>
                                                <li><a href="picker_date.html">Date &amp; time pickers</a></li>
                                                <li><a href="picker_color.html">Color pickers</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-insert-template"></i> Form layouts</a>
                                            <ul>
                                                <li><a href="form_layout_vertical.html">Vertical form</a></li>
                                                <li><a href="form_layout_horizontal.html">Horizontal form</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-3">
                                    <span className="menu-heading underlined">Appearance</span>
                                    <ul className="menu-list">
                                        <li>
                                            <a href="index.htm#"><i className="icon-grid"></i> Components</a>
                                            <ul>
                                                <li><a href="components_modals.html">Modals</a></li>
                                                <li><a href="components_dropdowns.html">Dropdown menus</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-browser"></i> Content panels</a>
                                            <ul>
                                                <li><a href="panels.html">Panels</a></li>
                                                <li><a href="panels_heading.html">Heading elements</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-droplets"></i> Content styling</a>
                                            <ul>
                                                <li><a href="appearance_text_styling.html">Text styling</a></li>
                                                <li><a href="appearance_syntax_highlighter.html">Syntax highlighter</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-gift"></i> Extra components</a>
                                            <ul>
                                                <li><a href="extra_sliders_noui.html">NoUI sliders</a></li>
                                                <li><a href="extra_sliders_ion.html">Ion range sliders</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-wrench3"></i> Tools</a>
                                            <ul>
                                                <li><a href="tools_session_timeout.html">Session timeout</a></li>
                                                <li><a href="tools_idle_timeout.html">Idle timeout</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-3">
                                    <span className="menu-heading underlined">Extensions</span>
                                    <ul className="menu-list">
                                        <li>
                                            <a href="index.htm#"><i className="icon-puzzle4"></i> Extensions</a>
                                            <ul>
                                                <li><a href="extension_image_cropper.html">Image cropper</a></li>
                                                <li><a href="extension_dnd.html">Drag and drop</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-popout"></i> JQuery UI</a>
                                            <ul>
                                                <li><a href="jqueryui_interactions.html">Interactions</a></li>
                                                <li><a href="jqueryui_navigation.html">Navigation</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-upload"></i> File uploaders</a>
                                            <ul>
                                                <li><a href="uploader_plupload.html">Plupload</a></li>
                                                <li><a href="uploader_dropzone.html">Dropzone</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-calendar3"></i> Event calendars</a>
                                            <ul>
                                                <li><a href="fullcalendar_views.html">Basic views</a></li>
                                                <li><a href="fullcalendar_advanced.html">Advanced usage</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-sphere"></i> Internationalization</a>
                                            <ul>
                                                <li><a href="internationalization_switch_direct.html">Direct translation</a></li>
                                                <li><a href="internationalization_callbacks.html">Callbacks</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-3">
                                    <span className="menu-heading underlined">Tables</span>
                                    <ul className="menu-list">
                                        <li>
                                            <a href="index.htm#"><i className="icon-table2"></i> Basic tables</a>
                                            <ul>
                                                <li><a href="table_basic.html">Basic examples</a></li>
                                                <li><a href="table_elements.html">Table elements</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-grid7"></i> Data tables</a>
                                            <ul>
                                                <li><a href="datatable_basic.html">Basic initialization</a></li>
                                                <li><a href="datatable_data_sources.html">Data sources</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-alignment-unalign"></i> Data tables extensions</a>
                                            <ul>
                                                <li><a href="datatable_extension_reorder.html">Columns reorder</a></li>
                                                <li><a href="datatable_extension_row_reorder.html">Row reorder</a></li>
                                                <li>
                                                    <a href="index.htm#">Buttons</a>
                                                    <ul>
                                                        <li><a href="datatable_extension_buttons_init.html">Initialization</a></li>
                                                        <li><a href="datatable_extension_buttons_html5.html">HTML5 buttons</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="datatable_extension_colvis.html">Columns visibility</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-file-spreadsheet"></i> Handsontable</a>
                                            <ul>
                                                <li><a href="handsontable_basic.html">Basic configuration</a></li>
                                                <li><a href="handsontable_advanced.html">Advanced setup</a></li>
                                                <li><a href="handsontable_cols.html">Column features</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="index.htm#"><i className="icon-versions"></i> Responsive options</a>
                                            <ul>
                                                <li><a href="table_responsive.html">Responsive basic tables</a></li>
                                                <li><a href="datatable_responsive.html">Responsive data tables</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                      <a href="index.htm#" className="dropdown-toggle notification" data-toggle="dropdown">
                          <i className="icon-cart4"></i>
                          <span className="visible-xs-inline-block position-right">Cart</span>
                          <span className="badge bg-warning-400">10</span>
                      </a>
                      <div className="dropdown-menu dropdown-content width-350">
                          <div className="dropdown-content-heading">
                              Cart
                          </div>
                          <ul className="media-list dropdown-content-body">
                              <li className="media">
                                  <div className="media-left">
                                      <img src="assets/images/demo/users/face10.jpg" className="img-circle img-sm" alt="" />
                                      <span className="badge bg-danger-400 media-badge">5</span>
                                  </div>
                                  <div className="media-body">
                                      <a href="index.htm#" className="media-heading">
                                          <span className="text-semibold">James Alexander</span>
                                          <span className="media-annotation pull-right">04:58</span>
                                      </a>
                                      <span className="text-muted">who knows, maybe that would be the best thing for me...</span>
                                  </div>
                              </li>
                          </ul>
                          <div className="dropdown-content-footer">
                              <a href="index.htm#" data-popup="tooltip" title="All messages"><i className="icon-menu display-block"></i></a>
                          </div>
                      </div>
                  </li>
                  <li className="dropdown">
                      <a href="index.htm#" className="dropdown-toggle notification" data-toggle="dropdown">
                          <i className="icon-bubble6"></i>
                          <span className="visible-xs-inline-block position-right">Message</span>
                          <span className="badge bg-warning-400">10</span>
                      </a>
                      <div className="dropdown-menu dropdown-content width-350">
                          <div className="dropdown-content-heading">
                              Messages
                          </div>
                          <ul className="media-list dropdown-content-body">
                              <li className="media">
                                  <div className="media-left">
                                      <img src="assets/images/demo/users/face10.jpg" className="img-circle img-sm" alt="" />
                                      <span className="badge bg-danger-400 media-badge">5</span>
                                  </div>
                                  <div className="media-body">
                                      <a href="index.htm#" className="media-heading">
                                          <span className="text-semibold">James Alexander</span>
                                          <span className="media-annotation pull-right">04:58</span>
                                      </a>
                                      <span className="text-muted">who knows, maybe that would be the best thing for me...</span>
                                  </div>
                              </li>
                          </ul>
                          <div className="dropdown-content-footer">
                              <a href="index.htm#" data-popup="tooltip" title="All messages"><i className="icon-menu display-block"></i></a>
                          </div>
                      </div>
                  </li>
                  <li className="dropdown">
                      <a className="dropdown-toggle notification" data-toggle="dropdown">
                          <i className="icon-bell3"></i>
                          <span className="visible-xs-inline-block position-right">Messages</span>
                          <span className="badge bg-warning-400">2</span>
                      </a>
                      <div className="dropdown-menu dropdown-content width-350">
                          <div className="dropdown-content-heading">
                              Notification
                          </div>
                          <ul className="media-list dropdown-content-body">
                              <li className="media">
                                  <div className="media-left">
                                      <img src="assets/images/demo/users/face10.jpg" className="img-circle img-sm" alt="" />
                                      <span className="badge bg-danger-400 media-badge">5</span>
                                  </div>
                                  <div className="media-body">
                                      <a href="index.htm#" className="media-heading">
                                          <span className="text-semibold">James Alexander</span>
                                          <span className="media-annotation pull-right">04:58</span>
                                      </a>
                                      <span className="text-muted">who knows, maybe that would be the best thing for me...</span>
                                  </div>
                              </li>
                          </ul>
                          <div className="dropdown-content-footer">
                              <a href="index.htm#" data-popup="tooltip" title="All messages"><i className="icon-menu display-block"></i></a>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
    </div>
  );
}

// Navigation.propTypes = {
//   className: PropTypes.string,
// };

export default withStyles(s)(Navigation);
