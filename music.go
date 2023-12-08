package main

import (
	"log"

	"golang.org/x/net/context"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func InitDB() {
	mydb, err := gorm.Open(sqlite.Open("./netease.db"), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	db = mydb
	db.AutoMigrate(&Song{})
}

type Song struct {
	ID         string
	SongName   string
	SingerName string
}

type Music struct {
	ctx context.Context
}

func NewMusic() *Music {
	return &Music{}
}

// AddSong 加入收藏
func (m *Music) AddSong(song Song) {
	//INSERT INTO `songs` (`id`,`song_name`,`singer_name`) VALUES ("789","江南","林俊杰")
	db.Create(song)
}

// DelSong 取消收藏
func (m *Music) DelSong(id string) {
	db.Unscoped().Where("id = ?", id).Delete(&Song{})
}

// IsExist 歌曲是否存在
func (m *Music) IsExist(id string) bool {
	var song Song
	err := db.Where("id = ?", id).First(&song).Error
	if err != nil {
		return false
	}
	return true
}

// GetAllSong 获取收藏列表
func (m *Music) GetAllSong() []Song {
	var songs []Song
	db.Find(&songs)
	return songs
}
