namespace InstaMemaTestaMAUI;

public partial class MainPage : ContentPage
{
	
	public MainPage()
	{
		InitializeComponent();
	}

	protected override void OnNavigatedFrom(NavigatedFromEventArgs args)
	{
		base.OnNavigatedFrom(args);

		lblTitle.Opacity = 1;
		lblsubTitle.Opacity = 1;
        CounterBtn.Opacity = 1;
    }

	private async void OnCounterClicked(object sender, EventArgs e)
	{
		await Task.WhenAll(
            lblTitle.FadeTo(0),
			lblsubTitle.FadeTo(0),
			CounterBtn.FadeTo(0)
		);

		await Shell.Current.GoToAsync("/Game");

    }
}

