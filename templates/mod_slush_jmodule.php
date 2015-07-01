<?php 
/**
*-------------------------------------------------------------------------------
* <%= projectName %> - <%= projectDescription %> by <%= authorName %> - <%= authorURL %>
*-------------------------------------------------------------------------------
* @package <%= projectName %>
* @version <%= projectVersion %>
* @author <%= authorName %> http://<%= authorURL %>
* @copyright (C) 2015 <%= authorName %>. All Rights Reserved
* @license - GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html or see LICENSE.txt
*
* <%= projectName %> is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
**/

defined('_JEXEC') or die('Access Restricted');

// require_once dirname(__FILE__) . '/helper.php';

$doc = JFactory::getDocument();

$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
require JModuleHelper::getLayoutPath('mod_slush_jmodule', $params->get('layout','default'));