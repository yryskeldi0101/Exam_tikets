   
    function hide_div(id) {
        if (elem(id).style.display == "none") elem(id).style.display = "block"; else elem(id).style.display = "none";
    }

    function HideTipId(id) {
        elem(id).style.display = "none";
    }

    function JastShow(id) {
        elem(id).style.display = "block";
    }

    function JastShowInline(id) {
        elem(id).style.display = "inline";
    }

    function JastHide(id) {
        HideTipId(id);
    }

    function MenuGoTo(url) {
        window.location = url;
    }

    function XHtpRequest(data) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'common.php', true);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xmlhttp.send(data);
    }

    function SetSettings() {
        if (elem("chat-active").checked) {
            chat_active = 1;
            JastShow("chat");
            if (window.screen.width > 1270) {
                subscribe();
                interval_refresh = window.setInterval(subscribe, 8000);
            }
        } else {
            chat_active = 0;
            clearInterval(interval_refresh);
            JastHide("chat");
        }
        if (elem("answers-shuffle").checked) answers_shuffle = 1; else answers_shuffle = 0;
        if (elem("quests-shuffle").checked) quests_shuffle = 1; else quests_shuffle = 0;
        if (elem("reviews-active").checked) {
            reviews_hide = 1;
            JastHide("reviews");
        } else {
            reviews_hide = 0;
            JastShow("reviews");
        }
        if (elem("article-active").checked) {
            article_hide = 1;
            JastHide("article");
        } else {
            article_hide = 0;
            JastShow("article");
        }
        if (elem("double-answer").checked) d_click_answer = 1; else d_click_answer = 0;
        MenuOpenDialog(0);
        var data = "setsettings=" + encodeURIComponent("c" + chat_active + "u" + "a" + answers_shuffle + "u" + "q" + quests_shuffle + "u" + "r" + reviews_hide + "u" + "t" + article_hide + "u" + "d" + d_click_answer + "u");
        XHtpRequest(data);
    }
    var req_reg_status = -1;

 function XHtpReqReg(data) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'register.php', true);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xmlhttp.send(data);
        xmlhttp.onload = function () {
            if (xmlhttp.status === 200) {
                req_reg_status = xmlhttp.responseText;
            } else {
                req_reg_status = 0;
            }
        }
    }
 function ResScoreCounter() {
        if (res_score >= res_score_final) {
            clearInterval(res_score_count_id);
            return;
        }
        res_score = res_score + 66;
        if (res_score < 0) res_score = res_score * -1;
        elem("res-score").innerHTML = res_score;
    }

    function ResScore(whatdo) {
        window.scrollTo(0, 0);
        clearInterval(in_id);
        if (whatdo == "hide") {
            JastHide("result-screen");
            JastHide("star_shadow");
        } else if (whatdo == "reset") {
            JastHide("result-screen");
            JastHide("star_shadow");
            JastHide("star");
            JastHide("nostar");
            elem("res-star1").style.width = "0%";
            elem("res-star2").style.width = "0%";
            elem("res-star3").style.width = "0%";
            res_score = 0;
            res_score_final = 0;
            clearInterval(res_score_count_id);
            elem("res-star2").src = "images/star_gray.png";
            elem("res-star3").src = "images/star_gray.png";
            res_star = 0;
        } else {
            q_done = true;
            if (whatdo == "plus5end") {
                res_win = 0;
                JastShow("nostar");
            } else {
                if (g_global_rezim == 3) {
                    if (g_wrongs_counter < 60) {
                        res_win = 1;
                        JastShow("star");
                    } else {
                        res_win = 0;
                        JastShow("nostar");
                    }
                } else {
                    if (g_wrongs_counter <= 2) {
                        res_win = 1;
                        JastShow("star");
                    } else {
                        res_win = 0;
                        JastShow("nostar");
                    }
                }
            }
            JastShow("result-screen");
            JastShow("star_shadow");
            var res_text_time_m = 19 - time_m;
            var res_text_time_s = 60 - time_s;
            if (res_text_time_s < 10) res_text_time_s = "0" + res_text_time_s;
            if (res_text_time_m == 19 && res_text_time_s == 60) {
                res_text_time_m = 20;
                res_text_time_s = "00";
            }
            if (plus_done) {
                res_text_time_m = 19 + 10 - time_m;
                res_text_time_s = 60 - time_s;
            }
            MySocialText = "Начинаю изучать экзаменационные билеты ПДД!";
            if (res_win) {
                var res_time_m = 19 - time_m;
                var res_time_s = 60 - time_s;
                if (res_time_m < 10) res_time_m = res_time_m / 1000 + 0.1; else res_time_m = res_time_m / 100 + 0.1;
                res_time_s = ((g_rights_counter - g_wrongs_counter) / res_time_s) * 100;
                res_score_final = ((g_rights_counter - g_wrongs_counter) / res_time_m) * 6 + res_time_s;
                res_star = 1;
                if (res_text_time_m < 10) {
                    elem("res-star2").src = "images/star.png";
                    res_star = 2;
                }
                if (res_text_time_m < 5) {
                    elem("res-star3").src = "images/star.png";
                    res_star = 3;
                }
                if (g_wrongs_counter == 1) {
                    elem("res-star3").src = "images/star_gray.png";
                    res_star = 2;
                } else if (g_wrongs_counter == 2) {
                    elem("res-star2").src = "images/star_gray.png";
                    elem("res-star3").src = "images/star_gray.png";
                    res_star = 1;
                }
                if (res_star == 1) {
                    elem("stars-bilet-menu").innerHTML = "<span class=star-coloured>*</span>**";
                } else if (res_star == 2) {
                    elem("stars-bilet-menu").innerHTML = "<span class=star-coloured>**</span>*";
                } else if (res_star == 3) {
                    elem("stars-bilet-menu").innerHTML = "<span class=star-coloured>***</span>";
                }
                elem("res-star1").style.width = "100%";
                setTimeout(function () {
                    elem("res-star2").style.width = "90%";
                }, 200);
                setTimeout(function () {
                    elem("res-star3").style.width = "100%";
                }, 500);
                res_score = Math.ceil(res_score_final);
                for (i = 0; i < 10; i++) res_score = res_score - 66;
                res_score_count_id = window.setInterval('ResScoreCounter()', 50);
                MySocialText = "Я скоро получу права!";
            }
            if (g_global_rezim == 3 || g_global_rezim == 2 || g_global_rezim == 4 || g_global_rezim == 6) {
                res_text_time_m = time_m;
                res_text_time_s = time_s;
                MyTime = time_h_text + "" + time_m_text + ":" + time_s_text;
                elem("res-time").innerHTML = MyTime;
            } else {
                if (res_text_time_m < 10) res_text_time_m = "0" + res_text_time_m;
                if (res_text_time_s < 10) res_text_time_s = "0" + res_text_time_s;
                elem("res-time").innerHTML = res_text_time_m + ":" + res_text_time_s;
                MyTime = res_text_time_m + ":" + res_text_time_s;
            }
            elem("res-wrongs").innerHTML = g_wrongs_counter;
            MyWrongs = g_wrongs_counter;
        }
    }

    var g_user_id = 0;
    var user_data = 0;

    function XHtpUserGetData(data) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'register.php', true);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xmlhttp.send(data);
        xmlhttp.onload = function () {
            if (xmlhttp.status === 200) {
                user_data = xmlhttp.responseText;
                user_data = user_data.split(/\s*,\s*/);
                elem("user-name-text").innerHTML = user_data[0];
                elem("user-card-name").innerHTML = user_data[0];
                elem("user-card-regdate").innerHTML = user_data[3];
                elem("user-card-lastdate").innerHTML = user_data[4];
                elem("user-card-progress").innerHTML = user_data[5];
                elem("user-card-zvanie").innerHTML = user_data[6];
                elem("user-card-rate").innerHTML = user_data[7];
                for (i = 0; i < user_data.length; i++) console.log(user_data[i]);
            } else {
                user_data = 0;
            }
        }
    }

 var in_id;
    var time_h = 0;
    var time_m = 19;
    var time_s = 60;
    var time_h_text = "";
    var time_m_text = 0;
    var time_s_text = 0;

   function StartMainTime() {
      if (g_global_rezim == 3 || g_global_rezim == 2 || g_global_rezim == 4 || g_global_rezim == 6) {
        time_s++;
        if (time_s > 59) {
            time_m++;
            time_s = 0;
        }
        if (time_m == 60) {
            time_h++;
            time_m = 0;
        }
        if (time_h > 0) time_h_text = time_h + ":";
    } else {
        time_s--;
        if (time_s < 0 && time_m > 0) {
            time_m--;
            time_s = 59;
        }
    }
    if (time_m < 10) time_m_text = "0" + time_m; else time_m_text = time_m;
    if (time_s < 10) time_s_text = "0" + time_s; else time_s_text = time_s;
    // existing code here

    // Check if 19 minutes have passed
   if (time_h == 0 && time_m == 0 && time_s == 0) {
        document.getElementById('timer').innerHTML = "Время вышло";
        clearInterval(in_id);
        // Display modal window
        alert("Время вышло");
    

        // Make all elements on the page inactive
        var questNumbers = document.getElementsByClassName("#container-quests");
        for (var i = 0; i < questNumbers.length; i++) {
            containerquests[i].style.display = "none";
        }

        clearInterval(in_id);
    }
    else if (time_m == 0 && time_s <= 0 && g_global_rezim != 3 && g_global_rezim != 2 && g_global_rezim != 4 && g_global_rezim != 6) {
        document.getElementById('timer').innerHTML = "00:00";
        clearInterval(in_id);
    } else {
        document.getElementById('timer').innerHTML = time_h_text + time_m_text + ":" + time_s_text;
    }
}


    var chat_active = 1;
    var quests_shuffle = 0;
    var answers_shuffle = 0;
    var article_hide = 0;
    var reviews_hide = 0;
    var plus_add = 0;
    var plus_add_rezim = 0;

    function SetSettings() {
        if (elem("chat-active").checked) {
            chat_active = 1;
            JastShow("chat");
            if (window.screen.width > 1270) {
                subscribe();
                interval_refresh = window.setInterval(subscribe, 8000);
            }
        } else {
            chat_active = 0;
            clearInterval(interval_refresh);
            JastHide("chat");
        }
        if (elem("answers-shuffle").checked) answers_shuffle = 1; else answers_shuffle = 0;
        if (elem("quests-shuffle").checked) quests_shuffle = 1; else quests_shuffle = 0;
        if (elem("reviews-active").checked) {
            reviews_hide = 1;
            JastHide("reviews");
        } else {
            reviews_hide = 0;
            JastShow("reviews");
        }
        if (elem("article-active").checked) {
            article_hide = 1;
            JastHide("article");
        } else {
            article_hide = 0;
            JastShow("article");
        }
        if (elem("double-answer").checked) d_click_answer = 1; else d_click_answer = 0;
        MenuOpenDialog(0);
        var data = "setsettings=" + encodeURIComponent("c" + chat_active + "u" + "a" + answers_shuffle + "u" + "q" + quests_shuffle + "u" + "r" + reviews_hide + "u" + "t" + article_hide + "u" + "d" + d_click_answer + "u");
        XHtpRequest(data);
    }
function LoadImage() {
        if (q_img_l < q_length) {
            for (i = q_img_l; i < q_img_l + 2; i++) {
                q_img_l_load[i] = true;
                if (q_img[i] == 1) {
                    q_img_src[i] = new Image();
                    q_img_src[i].src = q_img_name[i];
                } else {
                    q_img_src[i] = new Image();
                    q_img_src[i].src = "img_pdd/none.jpg";
                }
            }
        } else clearInterval(load_img_id);
        q_img_l = q_img_l + 2;
    }

    var plus_done = false;
    var plus5_active = false;
    var plus5_toomatchwrongs = false;



    function WhoNext() {
        for (i = 0; i < q_length; i++) {
            if (q_nq_done[i] != 1 && q_nq_done[i] != 2) {
                ShowQuest(i);
                return;
            }
        }
        var end_plus_check = false;
        var mistake_counter = 0;
        if (plus_add) {
            for (i = 0; i < 4; i++) {
                if (q_block_mistake[i] > 1) {
                    end_plus_check = true;
                    q_done = true;
                    plus5_toomatchwrongs = true;
                    break;
                }
            }
            if (!end_plus_check && g_wrongs_counter <= 2 && g_wrongs_counter > 0) {
                plus5_active = true;
                JastShow("container-quests-plus5");
                JastHide("container-quests");
                var counter_numbers = 0;
                for (i = 0; i < 20; i++) q_nq_done_p5[i] = 1;
                if (q_block_mistake[0]) {
                    for (i = 0; i < 5; i++) q_nq_done_p5[i] = 0;
                    time_m = time_m + 5;
                    JastShowInline("container-plus5-b1");
                    for (i = 0; i < 5; i++) elem("quest-num-p5" + i).innerHTML = i + 1;
                    counter_numbers = 1;
                }
                if (q_block_mistake[1]) {
                    for (i = 5; i < 10; i++) q_nq_done_p5[i] = 0;
                    time_m = time_m + 5;
                    JastShowInline("container-plus5-b2");
                    if (!counter_numbers) for (i = 0; i < 5; i++) elem("quest-num-p5" + (i + 5)).innerHTML = i + 1; else for (i = 0; i < 5; i++) elem("quest-num-p5" + (i + 5)).innerHTML = i + 6;
                    counter_numbers = 1;
                }
                if (q_block_mistake[2]) {
                    for (i = 10; i < 15; i++) q_nq_done_p5[i] = 0;
                    time_m = time_m + 5;
                    JastShowInline("container-plus5-b3");
                    if (!counter_numbers) for (i = 0; i < 5; i++) elem("quest-num-p5" + (i + 10)).innerHTML = i + 1; else for (i = 0; i < 5; i++) elem("quest-num-p5" + (i + 10)).innerHTML = i + 6;
                    counter_numbers = 1;
                }
                if (q_block_mistake[3]) {
                    for (i = 15; i < 20; i++) q_nq_done_p5[i] = 0;
                    time_m = time_m + 5;
                    JastShowInline("container-plus5-b4");
                    if (!counter_numbers) for (i = 0; i < 5; i++) elem("quest-num-p5" + (i + 15)).innerHTML = i + 1; else for (i = 0; i < 5; i++) elem("quest-num-p5" + (i + 15)).innerHTML = i + 6;
                    counter_numbers = 1;
                }
                WhoNextPlus5();
                return;
            }
        }
        if (plus_add) {
            for (i = 0; i < 20; i++) {
                if (q_nq_done[i] == 2) {
                    elem("quest-num" + i).innerHTML = "";
                    elem("quest-num" + i).className = "quest-number-red";
                } else if (q_nq_done[i] == 1) {
                    elem("quest-num" + i).className = "quest-number-green";
                }
            }
        }
        q_done = true;
        if ((plus_add_rezim && plus5_toomatchwrongs) || plus_end_mistake) ResScore("plus5end"); else ResScore();
        var data = "";
        var data_plus = "";
        var data_star = "";
        if (res_star != 0) data_star = "star=" + encodeURIComponent(res_star) + "&score=" + encodeURIComponent(Math.ceil(res_score_final)) + "&";
        if (g_global_rezim == 6) data_plus = "dowrongs=1&"; else if (g_global_rezim == 1 || g_global_rezim == 5) {
            data_plus = "updatestat&biletprogress=" + encodeURIComponent(q_idb[0]) + "&";
        } else data_plus = "";
        for (i = 0; i < g_wrongs_counter; i++) data = data + g_wrongs[i] + "u";
        data = data_star + data_plus + "wrongs=" + encodeURIComponent(data);
        if (g_global_update) {
            XHtpRequest(data);
            g_global_update = 0;
        }
        if (g_global_rezim == 1 || g_global_rezim == 5) {
            var class_name = "";
            if (g_wrongs_counter == 0) class_name = "span-bilet-p100"; else if (g_wrongs_counter < 5) class_name = "span-bilet-p75"; else if (g_wrongs_counter < 10) class_name = "span-bilet-p50"; else if (g_wrongs_counter < 18) class_name = "span-bilet-p25"; else if (g_wrongs_counter < 20) class_name = "span-bilet-p00";
            elem("select-bilet" + (q_idb[0] - 1)).className = class_name;
        }
    }

    var answer_once = -1;
    var answer_select = [];
    var ansdch_id = -1;
    var ansdch_a = -1;

    


    function Pause() {
        if (!q_done) {
            if (g_pause_active) {
                clearInterval(in_id);
                document.getElementById('timer').innerHTML = "<span class=pause>ПАУЗА</span>";
            } else {
                if (g_global_rezim == 3 || g_global_rezim == 2 || g_global_rezim == 4 || g_global_rezim == 6) time_s++; else time_s--;
                StartMainTime();
                in_id = window.setInterval('StartMainTime()', 1000);
            }
        }
    }

    function Start() {
        UserGetData(0);
        q_block_mistake[0] = 0;
        q_block_mistake[1] = 0;
        q_block_mistake[2] = 0;
        q_block_mistake[3] = 0;
        if (g_global_rezim == 3 || g_global_rezim == 2 || g_global_rezim == 4 || g_global_rezim == 6) {
            time_m = 0;
            time_s = 0;
        } else {
            time_m = 19;
            time_s = 60;
        }
        StartMainTime();
        in_id = window.setInterval('StartMainTime()', 1000);
        ShowQuest(0);
        LoadImage();
        load_img_id = window.setInterval('LoadImage()', 2000);
        for (i = 0; i < q_length; i++) {
            elem("quest-num" + i).addEventListener('click', ShowQuest.bind(null, i), false);
        }
        elem("lines").addEventListener('click', function () {
            hide_div('container-menu');
            hide_div('box');
            HideTipId('tipsmenu');
            if (!g_pause_active) {
                g_pause_active = true;
            } else {
                g_pause_active = false;
            }
            Pause();
        }, false);
        elem("but-menu").addEventListener('click', function () {
            hide_div('container-menu');
            hide_div('box');
            HideTipId('tipsmenu');
            ResScore("hide");
            scroll(0, 0);
        }, false);
        elem("but-close").addEventListener('click', function () {
            ResScore("hide");
        }, false);
        elem("but-repeat").addEventListener('click', function () {
            RepeatExam("hide");
        }, false);
       

        if (category_abmcd == 1) elem("menu-buttom-abmcd").addEventListener('click', function () {
            window.location = "?bilety-abm";
        }, false); 
       
        if (g_registered) {
            elem("user-name-text").innerHTML = "";
            JastHide("menu-buttom-login");
            elem("menu-buttom-user").style.display = "inline-block";
            JastShow("EnterTextInput");
            JastHide("InToChat");
            JastHide("NameToChat");
        }
    }
/*функция отвечает за перепрохождение теста*/
    function RepeatExam() {
        plus5_active = false;
        if (plus_done) {
            plus_add = true;
            plus5_active = false;
            plus_done = false;
            for (i = 1; i <= 4; i++) JastHide("container-plus5-b" + i);
            JastHide("container-quests-plus5");
            for (i = 0; i < q_length; i++) {
                elem("quest-num-p5" + i).innerHTML = i + 1;
                elem("quest-num-p5" + i).className = "quest-number";
                q_nq_done_p5[i] = 0;
            }
            elem("quest-num-p50").className = elem("quest-num-p50").className + " quest-number-active quest-number-p5";
        }
        q_block_mistake[0] = 0;
        q_block_mistake[1] = 0;
        q_block_mistake[2] = 0;
        q_block_mistake[3] = 0;
        plus5_toomatchwrongs = false;
        q_done = false;
        ResScore("reset");
        g_rights_counter = 0;
        g_wrongs_counter = 0;
        g_global_update = 1;
        for (i = 0; i < q_length; i++) {
            elem("quest-num" + i).innerHTML = i + 1;
            elem("quest-num" + i).className = "quest-number";
            q_nq_done[i] = 0;
        }
        if (g_global_rezim == 3 || g_global_rezim == 2 || g_global_rezim == 4 || g_global_rezim == 6) {
            time_m = 0;
            time_s = 0;
        } else {
            time_m = 19;
            time_s = 60;
        }
        in_id = window.setInterval('StartMainTime()', 1000);
        ShowQuest(0);
    }
    /*функция отвечает за введение ответа с клавы*/

    var event_key_down;
    document.onkeydown = function (event_key_down) {
        event_key_down = event_key_down || window.event;
        if (event_key_down.keyCode === 27) {
            hide_div('container-menu');
            hide_div('box');
            HideTipId('tipsmenu');
            if (!g_pause_active) {
                g_pause_active = true;
            } else {
                g_pause_active = false;
            }
            Pause();
        }
        if (event_key_down.keyCode === 49 && document.activeElement.getAttribute("id") != "inputtext") {
            if (!plus5_active) DoAnswer(q_qnum_id, 0); else DoAnswerPlus5(q_qnum_id_p5, 0);
        }
        if (event_key_down.keyCode === 50 && document.activeElement.getAttribute("id") != "inputtext") {
            if (!plus5_active) DoAnswer(q_qnum_id, 1); else DoAnswerPlus5(q_qnum_id_p5, 1);
        }
        if (event_key_down.keyCode === 51 && document.activeElement.getAttribute("id") != "inputtext") {
            if (!plus5_active) DoAnswer(q_qnum_id, 2); else DoAnswerPlus5(q_qnum_id_p5, 2);
        }
        if (event_key_down.keyCode === 52 && document.activeElement.getAttribute("id") != "inputtext") {
            if (!plus5_active) DoAnswer(q_qnum_id, 3); else DoAnswerPlus5(q_qnum_id_p5, 3);
        }
        if (event_key_down.keyCode === 13 && chat_active && document.activeElement.getAttribute("id") == "inputtext") {
            SendMyMessage();
            console.log("Send Message");
        }
    };

   


//функция выбора рандомного билета
    function UserGetData(user_id) {
        if (user_id > 0) {
            XHtpUserGetData("getuserdata=" + encodeURIComponent(user_id));
        }
    }


  function DoAnswer(id, i) {
        if (i > a_answers[id].length - 1) return;
        if (d_click_answer && q_nq_done[id] != 1 && q_nq_done[id] != 2) {
            if (ansdch_id != id) {
                elem("answer" + i).className = "answer_gray";
                ansdch_id = id;
                ansdch_a = i;
                return;
            } else if (ansdch_id == id && ansdch_a != i) {
                elem("answer" + ansdch_a).className = "answer";
                elem("answer" + i).className = "answer_gray";
                ansdch_id = id;
                ansdch_a = i;
                return;
            } else {
                ansdch_a = -1;
                ansdch_id = -1;
            }
        }
        if (!q_done && plus_add_rezim) {
            if (answer_once == id) return; else answer_once = id;
        }
        if (plus_add && !plus5_toomatchwrongs && !q_nq_done[id]) {
            elem("answer" + i).className = "answer_yellow";
            answer_select[id] = i;
        }
        if (a_t[id] != i) {
            if (!plus_add || plus5_toomatchwrongs) {
                elem("answer" + i).className = "answer_red";
                JastShow("tip-quest");
            } else setTimeout(function () {
                WhoNext()
            }, 350);
            if (!q_nq_done[id]) {
                q_nq_done[id] = 2;
                if (!plus_add || plus5_toomatchwrongs) {
                    elem("quest-num" + id).innerHTML = "";
                    elem("quest-num" + id).className = "quest-number-red quest-number-active";
                }
                g_wrongs[g_wrongs_counter] = q_id[id];
                g_wrongs_counter++;
                g_complitequests++;
                if (g_global_rezim != 6) g_wronrs_cur_counter++;               
                if (plus_add) {
                    g_mistake = 1;
                    if (id > -1 && id < 5) {
                        q_block_mistake[0]++;
                    } else if (id > 4 && id < 10) {
                        q_block_mistake[1]++;
                    } else if (id > 9 && id < 15) {
                        q_block_mistake[2]++;
                    } else if (id > 14 && id < 20) {
                        q_block_mistake[3]++;
                    }
                }
            }
        } else {
            if (!plus_add) elem("answer" + i).className = "answer_green";
            if (!q_nq_done[id]) {
                q_nq_done[id] = 1;
                g_rights_counter++;
                g_complitequests++;
            }
            setTimeout(function () {
                WhoNext()
            }, 350);
        }
    };

    function ShowQuest(id, type) {
        JastHide("result-examen");
        JastShow("container-quest");
        elem("quest-block").innerHTML = q_quest[id];
        elem("tip-quest").innerHTML = q_tips[id];
        if (g_global_rezim == 3 && g_complitequests > 0) elem("info-quest").innerHTML = "Билет №" + q_idb[id] + ", Вопрос №" + q_nq[id] + ' (' + g_complitequests + ' из 800)'; else elem("info-quest").innerHTML = "Билет №" + q_idb[id] + ", Вопрос №" + q_nq[id];
        if (id < q_img_l) {
            elem("quest-image").src = q_img_src[id].src;
        } else {
            hide_div("OhWaitLoadImage");
            elem("quest-image").src = "images/load.jpg";
            var i = new Image();
            i.onload = function () {
                HideTipId("OhWaitLoadImage");
                if (q_img[id] == 0) {
                    elem("quest-image").src = "img_pdd/none.jpg";
                } else {
                    elem("quest-image").src = q_img_name[id];
                }
            };
            if (q_img[id] == 0) {
                i.src = "img_pdd/none.jpg";
            } else {
                i.src = q_img_name[id];
            }
        }
        var elem_answers = "";
        for (i = 0; i < a_length[id]; i++) elem_answers = elem_answers + "<div id=answer" + i + " class=answer><ol start=\"" + (i + 1) + "\"><li>" + a_answers[id][i] + "</li></ol></div>";
        elem("answers-block").innerHTML = elem_answers;
        for (i = 0; i < a_length[id]; i++) {
            elem("answer" + i).addEventListener('click', DoAnswer.bind(null, id, i), false);
        }
        elem("quest-num" + id).className = elem("quest-num" + id).className + " quest-number-active";
        if (q_qnum_id >= 0) {
            if (q_nq_done[q_qnum_id] == 1) {
                if (!plus_add || plus5_toomatchwrongs) elem("quest-num" + q_qnum_id).className = "quest-number-green"; else elem("quest-num" + q_qnum_id).className = "quest-number-gray";
            } else if (q_nq_done[q_qnum_id] == 2) {
                if (!plus_add || plus5_toomatchwrongs) elem("quest-num" + q_qnum_id).className = "quest-number-red"; else elem("quest-num" + q_qnum_id).className = "quest-number-gray";
            } else elem("quest-num" + q_qnum_id).className = "quest-number";
        }
        q_qnum_id = id;
        if (q_nq_done[id]) {
            if (!plus_add || q_done) {
                JastShow("tip-quest");
                elem("answer" + a_t[id]).className = "answer_green";
                if (plus_add_rezim) {
                    if (q_nq_done[id] == 2) elem("answer" + answer_select[id]).className = "answer_yellow";
                }
            } else elem("answer" + answer_select[id]).className = "answer_yellow";
        } else JastHide("tip-quest");
    }

openkgStuff = function () {
    var links = [
    "1kg.html",
    "2kg.html",
    "3kg.html",
    "4kg.html",
    "5kg.html",
    "6kg.html",
    "7kg.html",
    "8kg.html",
    "9kg.html",
    "10kg.html",
    "11kg.html",
    "12kg.html",
    "13kg.html",
    "14kg.html",
    "15kg.html",
    "16kg.html",
    "17kg.html",
    "19kg.html",
    "20kg.html",
    "21kg.html",
    "22kg.html",
    "23kg.html",
    "24kg.html",
    "25kg.html",
    "26kg.html",
    "27kg.html",
    "28kg.html",
    "29kg.html"];
    // get a random number between 0 and the number of links
    var randIdx = Math.random() * links.length;
    // round it, so it can be used as array index
    randIdx = parseInt(randIdx, 10);
    // construct the link to be opened
    var link = links[randIdx];
    // open it in a new window / tab (depends on browser setting)
    window.open(link);
};
openStuff = function () {
    var links = [
    "1.html",
    "2.html",
    "3.html",
    "4.html",
    "5.html",
    "6.html",
    "7.html",
    "8.html",
    "9.html",
    "10.html",
    "11.html",
    "12.html",
    "13.html",
    "14.html",
    "15.html",
    "16.html",
    "17.html",
    "19.html",
    "20.html",
    "21.html",
    "22.html",
    "23.html",
    "24.html",
    "25.html",
    "26.html",
    "27.html",
    "28.html",
    "29.html",
    "30.html",
    "31.html",
    "32.html"
    ];
    // get a random number between 0 and the number of links
    var randIdx = Math.random() * links.length;
    // round it, so it can be used as array index
    randIdx = parseInt(randIdx, 10);
    // construct the link to be opened
    var link = links[randIdx];
    // open it in a new window / tab (depends on browser setting)
    window.open(link);
};