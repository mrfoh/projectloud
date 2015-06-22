<?php namespace Bps\Data\Traits;
	
	use Bps\Data\Models\User;

	trait AccessControl {

		public function isAdmin() {
			$roles = $this->roles;

			foreach($roles as $role) {
				if($role->id == 1 || $role->slug == "admin")
					return true;
			}

			return false;
		} 
	}