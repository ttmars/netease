package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	InitDB()
	run()
}

func run() {
	// Create an instance of the app structure
	app := NewApp()
	music := NewMusic()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "netease",
		Width:  1200,
		Height: 800,
		// DisableResize: true, // 固定窗口
		// Frameless:     true, // 无边框
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		// BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
			music,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
