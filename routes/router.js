const express = require('express');
const router = express.Router();
const { upload } = require('../config/multerConfig')
const {
    onLoginById, getUserToken, onLogout, checkExistId, checkExistNickname, sendSms, kakaoCallBack, editMyInfo, uploadProfile, onLoginBySns, getAddressByText, getMyInfo,//auth
    getUsers, getOneWord, getOneEvent, getItems, getItem, getHomeContent, getSetting, getVideoContent, getChannelList, getVideo, onSearchAllItem, findIdByPhone, findAuthByIdAndPhone, getComments, getCommentsManager, getCountNotReadNoti, getNoticeAndAlarmLastPk, getAllPosts, getUserStatistics, itemCount, addImageItems,//select
    addMaster, onSignUp, addOneWord, addOneEvent, addItem, addItemByUser, addIssueCategory, addNoteImage, addVideo, addSetting, addChannel, addFeatureCategory, addNotice, addComment, addAlarm, addPopup,//insert 
    updateUser, updateItem, updateIssueCategory, updateVideo, updateMaster, updateSetting, updateStatus, updateChannel, updateFeatureCategory, updateNotice, onTheTopItem, changeItemSequence, changePassword, updateComment, updateAlarm, updatePopup,//update
    deleteItem, onResign, getAcademyList, getEnrolmentList, getMyItems, getMyItem, onSubscribe, updateSubscribe, getMyAcademyClasses, getMyAcademyClass, getMyAcademyList, getHeaderContent, getAcademyCategoryContent, getMasterContent, getReviewByMasterPk
} = require('./api')
const image_list = [
    { name: 'master' },
    { name: 'master2' },
    { name: 'content' },
    { name: 'content1' },
    { name: 'content2' },
    { name: 'content3' },
    { name: 'content4' },
    { name: 'content5' },
    { name: 'popup' },
    { name: 'profile' },
    { name: 'ad' },
    { name: 'note' },
]
router.post('/addimageitems', upload.fields(image_list), addImageItems);
router.post('/addalarm', addAlarm);
router.post('/updatealarm', updateAlarm);
router.post('/editmyinfo', editMyInfo);
router.post('/uploadprofile', upload.single('profile'), uploadProfile)
router.post('/kakao/callback', kakaoCallBack);
router.post('/sendsms', sendSms);
router.post('/findidbyphone', findIdByPhone);
router.post('/findauthbyidandphone', findAuthByIdAndPhone);
router.post('/checkexistid', checkExistId);
router.post('/checkexistnickname', checkExistNickname);
router.post('/changepassword', changePassword);
router.post('/adduser', onSignUp);
router.post('/addmaster', upload.fields([{ name: 'master' }, { name: 'channel' }]), addMaster);
router.post('/updatemaster', upload.fields([{ name: 'master' }, { name: 'channel' }]), updateMaster);
router.post('/addchannel', upload.single('channel'), addChannel);
router.post('/updatechannel', upload.single('channel'), updateChannel);
router.get('/getchannel', getChannelList);
router.post('/loginbyid', onLoginById);
router.post('/loginbysns', onLoginBySns);
router.post('/logout', onLogout);
router.get('/auth', getUserToken);
router.get('/users', getUsers);
router.post('/addoneword', upload.single('content'), addOneWord);
router.post('/addoneevent', upload.single('content'), addOneEvent);
router.post('/additem', upload.fields([{ name: 'content' }, { name: 'content2' }]), addItem);
router.post('/additembyuser', upload.fields([{ name: 'content' }, { name: 'content2' }]), addItemByUser);
router.post('/updateitem', upload.fields([{ name: 'content' }, { name: 'content2' }]), updateItem);
router.post('/addvideo', addVideo);
router.post('/updatevideo', updateVideo);
router.post('/addnotice', addNotice);
router.post('/updatenotice', updateNotice);
router.post('/addissuecategory', upload.single('content'), addIssueCategory);
router.post('/updateissuecategory', upload.single('content'), updateIssueCategory);
router.post('/addfeaturecategory', upload.single('content'), addFeatureCategory);
router.post('/updatefeaturecategory', upload.single('content'), updateFeatureCategory);
router.post('/addimage', upload.single('note'), addNoteImage);
router.post('/deleteitem', deleteItem);
router.post('/resign', onResign);
router.post('/updateuser', updateUser);
router.get('/onsearchallitem', onSearchAllItem);
router.get('/oneword', getOneWord);
router.get('/oneevent', getOneEvent);
router.get('/items', getItems);
router.post('/items', getItems);
router.post('/myitems', getMyItems);
router.post('/myacademyclasses', getMyAcademyClasses);
router.post('/myacademyclass', getMyAcademyClass);
router.post('/myacademylist', getMyAcademyList);
router.post('/myitem', getMyItem);
router.get('/getallposts', getAllPosts);
router.get('/getuserstatistics', getUserStatistics);
router.get('/itemcount', itemCount);
router.get('/gethomecontent', getHomeContent);
router.get('/getheadercontent', getHeaderContent);
router.get('/getacademylist', getAcademyList);
router.get('/getenrolmentlist', getEnrolmentList);
router.get('/getacademycategorycontent', getAcademyCategoryContent);
router.get('/getmastercontent', getMasterContent);
router.get('/getreviewbymasterpk', getReviewByMasterPk);
router.get('/getmyinfo', getMyInfo);
router.post('/getaddressbytext', getAddressByText);


router.post('/updatesetting', upload.fields([{ name: 'content' }, { name: 'content2' }]), updateSetting);
router.post('/addsetting', upload.single('master'), addSetting);
router.get('/setting', getSetting);
router.post('/updatestatus', updateStatus);
//router.get('/getvideocontent', getVideoContent);
router.get('/video/:pk', getVideo);
router.post('/onthetopitem', onTheTopItem);
router.post('/changeitemsequence', changeItemSequence);
router.get('/getcommnets', getComments);
router.post('/addcomment', addComment);
router.post('/updatecomment', updateComment);
router.get('/getcommentsmanager', getCommentsManager);
router.post('/getcountnotreadnoti', getCountNotReadNoti);
router.get('/getnoticeandalarmlastpk', getNoticeAndAlarmLastPk);
router.post('/addpopup', upload.single('content'), addPopup);
router.post('/updatepopup', upload.single('content'), updatePopup);
router.post('/onsubscribe',  onSubscribe);
router.post('/updatesubscribe',  updateSubscribe);

module.exports = router;