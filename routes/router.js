const express = require('express');
const router = express.Router();
const { upload } = require('../config/multerConfig')
const {
    onLoginById, getUserToken, onLogout, checkExistId, checkPassword, checkExistIdByManager, checkExistNickname, sendSms, kakaoCallBack, editMyInfo, uploadProfile, onLoginBySns, getAddressByText, getMyInfo, getShops, //auth
    getUsers, getItems, getHomeContent, getSetting, getVideo, onSearchAllItem, findIdByPhone, findAuthByIdAndPhone, getComments, getCommentsManager, getAllPosts, getUserStatistics, itemCount, addImageItems,//select
    onSignUp, addItem, addItemByUser, addNoteImage, addSetting, addComment, addPopup, //insert 
    updateUser, updateItem, updateSetting, updateStatus, onTheTopItem, changeItemSequence, changePassword, updateComment, updatePopup,//update
    deleteItem, onResign, getMyItems, getMyItem, getHeaderContent, getMasterContent, getReviewByMasterPk, getShop, getAddressByLocation
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
    { name: 'pdfimg' },
    { name: 'pdf' },
    { name: 'city' },
    { name: 'country' },
]
router.post('/addimageitems', upload.fields(image_list), addImageItems);
router.post('/editmyinfo', editMyInfo);
router.post('/uploadprofile', upload.single('profile'), uploadProfile)
router.post('/kakao/callback', kakaoCallBack);
router.post('/sendsms', sendSms);
router.post('/findidbyphone', findIdByPhone);
router.post('/findauthbyidandphone', findAuthByIdAndPhone);
router.post('/checkexistid', checkExistId);
router.post('/checkpassword', checkPassword);
router.post('/checkexistidbymanager', checkExistIdByManager);
router.post('/checkexistnickname', checkExistNickname);
router.post('/changepassword', changePassword);
router.post('/adduser', onSignUp);
router.post('/loginbyid', onLoginById);
router.post('/loginbysns', onLoginBySns);
router.post('/logout', onLogout);
router.get('/auth', getUserToken);
router.get('/users', getUsers);
router.post('/additem', upload.fields([{ name: 'content' }, { name: 'content2' }]), addItem);
router.post('/additembyuser', upload.fields([{ name: 'content' }, { name: 'content2' }]), addItemByUser);
router.post('/updateitem', upload.fields([{ name: 'content' }, { name: 'content2' }]), updateItem);
router.post('/addimage', upload.single('note'), addNoteImage);
router.post('/deleteitem', deleteItem);
router.post('/resign', onResign);
router.post('/updateuser', updateUser);
router.get('/onsearchallitem', onSearchAllItem);
router.get('/items', getItems);
router.post('/items', getItems);
router.post('/shops', getShops);
router.post('/shop', getShop);
router.post('/myitems', getMyItems);
router.post('/myitem', getMyItem);
router.get('/getallposts', getAllPosts);
router.get('/getuserstatistics', getUserStatistics);
router.get('/itemcount', itemCount);
router.get('/gethomecontent', getHomeContent);
router.get('/getheadercontent', getHeaderContent);
router.get('/getmastercontent', getMasterContent);
router.get('/getreviewbymasterpk', getReviewByMasterPk);
router.get('/getmyinfo', getMyInfo);
router.post('/getaddressbytext', getAddressByText);
router.post('/getaddressbylocation', getAddressByLocation);



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
router.post('/addpopup', upload.single('content'), addPopup);
router.post('/updatepopup', upload.single('content'), updatePopup);

module.exports = router;