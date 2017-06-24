exports.commands = {
	rk: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return;
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) {
			return this.sendReply("User " + this.targetUsername + " not found.");
		}
		if (!room.users[targetUser.userid]) {
			return this.sendReply("El usuario " + this.targetUsername + " no es de esta sala " + room.id + ".");
		}
		if (!this.can('kick', targetUser, room)) return false;
		var msg = "kickeado de la sala " + room.id + " por " + user.name + (target ? " (" + target + ")" : "") + ".";
		this.addModCommand("" + targetUser.name + " was " + msg);
		targetUser.popup("You have been " + msg);
		targetUser.leaveRoom(room);
	}
};
