﻿namespace InstaMemaTestaMAUI;

public partial class AppShell : Shell
{
	public AppShell()
	{
		InitializeComponent();
		Routing.RegisterRoute("/Game", typeof(GameView));
	}
}
