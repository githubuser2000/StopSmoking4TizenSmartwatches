Imports System.Xml.XPath
Imports System.Xml
' nach 12h Kohlenmonoxid im Blut wie bei einem Nichtraucher
' nach 48h Geruch und Geschmack wie bei einem Nichtraucher
' nach 2 Wochen bis 3 Monaten Durchblutung und Lungenfunktion verbessert
' nach 1 bis 9 Monaten: Raucherhusten und Kurzatmigkeit verschwinden
' nach 1 Jahr Infarktrisiko halb so hoch wie bei einem Raucher
' nach 5 Jahren Schlaganfallsrisiko wie das eines Nichtrauchers
' nach 10 Jahren Lungenkrebsrisiko nur noch halb so hoch wie bei einem Raucher
' nach 15 Jahren Infarktrisiko nur noch so wie bei einem Nichtraucher


Public Class zigarettenmesser

    Private anfang As Date
    Private stunden_gesamt As Integer
    Private stunden As Integer
    Private tage As Integer
    Private wochen As Integer
    Private monate As Integer
    Private jahre As Integer
    Private a, b, c As Integer
    Dim doc As New XmlDocument()
    Dim xml_dir As String = My.Computer.FileSystem.SpecialDirectories.CurrentUserApplicationData + "\"
    Private nichtraucherprozent_gewesen As String

    Private Sub make_sparzeit()
        If IsNumeric(b_rauchdauer.Text) And IsNumeric(b_stueck.Text) Then
            Dim rauchminuten As Long = Math.Floor(stunden_gesamt / 24 * CInt(b_rauchdauer.Text) * CInt(b_stueck.Text))
            If rauchminuten >= 0 Then
                Dim rauchjahre As Integer = Math.Floor(rauchminuten / (60 * 24 * 30.4375 * 12))
                Zeittext.Text = ""
                If rauchjahre > 0 Then
                    If rauchjahre = 1 Then
                        Zeittext.Text += rauchjahre.ToString + " Jahr "
                    Else
                        Zeittext.Text += rauchjahre.ToString + " Jahre "
                    End If
                    rauchminuten -= Math.Floor(rauchjahre * 60 * 24 * 30.4375 * 12)
                End If
                Dim rauchmonate As Integer = Math.Floor(rauchminuten / (60 * 24 * 30.4375))
                If rauchmonate > 0 Then
                    If rauchmonate = 1 Then
                        Zeittext.Text += rauchmonate.ToString + " Monat "
                    Else
                        Zeittext.Text += rauchmonate.ToString + " Monate "
                    End If
                    rauchminuten -= Math.Floor(rauchmonate * 60 * 24 * 30.4375)
                End If
                Dim rauchtage As Integer = Math.Floor(rauchminuten / (60 * 24))
                If rauchtage > 0 Then
                    If rauchtage = 1 Then
                        Zeittext.Text += rauchtage.ToString + " Tag "
                    Else
                        Zeittext.Text += rauchtage.ToString + " Tage "
                    End If
                    rauchminuten -= rauchtage * 60 * 24
                End If
                Dim rauchstunden As Integer = Math.Floor(rauchminuten / 60)
                If rauchstunden > 0 And rauchmonate = 0 Then
                    If rauchstunden = 1 Then
                        Zeittext.Text += rauchstunden.ToString + " Stunde "
                    Else
                        Zeittext.Text += rauchstunden.ToString + " Stunden "
                    End If
                    rauchminuten -= rauchstunden * 60
                End If
                If rauchminuten > 0 And rauchmonate = 0 And rauchjahre = 0 Then
                    If rauchminuten = 1 Then
                        Zeittext.Text += rauchminuten.ToString + " Minute "
                    Else
                        Zeittext.Text += rauchminuten.ToString + " Minuten "
                    End If
                End If
                Label4.Text = "Rauchzeit gespart."
            Else
                Zeittext.Text = "Die Eingabe ist nicht richtig."
                Label4.Text = ""
            End If
        Else
            Zeittext.Text = "Die Eingabe ist nicht numerisch."
            Label4.Text = ""
        End If
    End Sub

    Private Sub make_texts()
        Label1.Text = ""
        If anfang.Ticks < Date.Now.Ticks Then
            If jahre > 0 Then
                If jahre = 1 Then
                    Label1.Text = jahre.ToString + " Jahr "
                Else
                    Label1.Text = jahre.ToString + " Jahre "
                End If
            End If
            If wochen > 0 And RadioButton3.Checked = True Then
                If wochen = 1 Then
                    Label1.Text += wochen.ToString + " Woche "
                Else
                    Label1.Text += wochen.ToString + " Wochen "
                End If
            End If
            If monate > 0 And Not RadioButton3.Checked = True Then
                If monate = 1 Then
                    Label1.Text += "1 Monat "
                Else
                    Label1.Text += monate.ToString + " Monate "
                End If
            End If
            If tage > 0 And jahre = 0 Then
                If tage = 1 Then
                    Label1.Text += "1 Tag "
                Else
                    Label1.Text += tage.ToString + " Tage "
                End If
            End If
            If stunden > 0 And jahre = 0 And monate = 0 Then
                If stunden = 1 Then
                    Label1.Text += stunden.ToString + " Stunde"
                Else
                    Label1.Text += stunden.ToString + " Stunden"
                End If
            End If
        End If
        NotifyIcon1.BalloonTipIcon = ToolTipIcon.Info
        NotifyIcon1.BalloonTipText = Label1.Text
        NotifyIcon1.BalloonTipTitle = "Nichtraucher"
        NotifyIcon1.BalloonTipText += Chr(13) + b_tabbaksumme.Text + "€ gespart (Tabbak) oder"
        NotifyIcon1.BalloonTipText += Chr(13) + b_schachtelsumme.Text + "€ gespart (Schachteln)"

        Dim kebsrisikosenkung As Integer = Math.Round(stunden_gesamt / (9.5 * 365.25 * 24) * 1000)
        Dim lunge_regeneriert As Integer = Math.Round(stunden_gesamt / (7.5 * 365.25 * 24) * 1000)
        Dim Herzinfarktrisiko As Integer = Math.Round(stunden_gesamt / (1.5 * 365.25 * 24) * 1000)
        Dim geschmack As Integer = Math.Round(stunden_gesamt / 48 * 100)
        Dim kohlmonox As Integer = Math.Round(stunden_gesamt / 12 * 100)
        Dim durchblutung As Integer = Math.Round(stunden_gesamt / 24 / 14 * 100)
        Dim husten As Integer = Math.Round(stunden_gesamt / 24 / 30.4 * 100)
        If kohlmonox > 100 Then kohlmonox = 100
        If geschmack > 100 Then geschmack = 100
        If kebsrisikosenkung > 1000 Then kebsrisikosenkung = 1000
        If lunge_regeneriert > 1000 Then lunge_regeneriert = 1000
        If Herzinfarktrisiko > 1000 Then Herzinfarktrisiko = 1000
        If husten < 100 Then
            lb_husten.Text = "Kurzatmigkeit hat " + husten.ToString + "% begonnen besser zu werden."
        Else
            husten = Math.Round(stunden_gesamt / 24 / 30.4 / 9 * 100)
            If husten < 100 Then
                lb_husten.Text = "Kurzatmigkeit baut " + husten.ToString + "% ab."
            Else
                lb_husten.Text = ""
            End If
        End If
        If durchblutung < 100 Then
            lb_durchblut.Text = "Durchblutung ist " + durchblutung.ToString + "% am Beginnen sich zu verbessern."
        Else
            durchblutung = Math.Round(stunden_gesamt / 24 / 30.4 / 3 * 100)
            If durchblutung < 100 Then
                lb_durchblut.Text = "Durchblutung ist bei " + durchblutung.ToString + "% Verbesserung."
            Else
                lb_durchblut.Text = ""
            End If
        End If
        lb_kohlenmonoxid.Text = "Kohlenmonoxid im Blut ist " + kohlmonox.ToString + "% wie beim Nichtraucher."
        lb_geschmack.Text = "Der Geschmack und Geruch ist zu " + geschmack.ToString + "% zurück."
        l_krebs.Text = "Das Krebsrisiko ist um " + (kebsrisikosenkung / 10).ToString + "% gesunken."
        l_lunge_regeneriert.Text = "Die Lunge hat sich zu " + (lunge_regeneriert / 10).ToString + "% regeneriert."
        l_Herzinfarktrisiko.Text = "Das Herzinfarktrisiko ist zu " + (Herzinfarktrisiko / 10).ToString + "%"
        Label5.Text = "wie bei einem Nichtraucher."
    End Sub

    Private Sub set_time(ByVal datum As Date)
        If datum.Ticks > Date.Now.Ticks Then
            datum = Now
            datum = datum.AddHours(-1)
            b_jahr.Text = datum.Year.ToString
            b_monat.Text = datum.Month.ToString
            b_tag.Text = datum.Day.ToString
            b_stunde.Text = datum.Hour.ToString
            b_minute.Text = datum.Minute.ToString
        End If
        anfang = datum
        If anfang.Ticks < Date.Now.Ticks Then
            stunden_gesamt = Math.Floor((Date.Now.Ticks - anfang.Ticks) / 3600 / 10000000)
            Dim stunden_gesamt2 = stunden_gesamt
            stunden = stunden_gesamt Mod 24
            jahre = Math.Floor((Date.Now.Ticks - datum.Ticks) / 10000000 / 3600 / 24 / 365.25)
            stunden_gesamt2 -= Math.Floor(jahre * 24 * 356.25)
            wochen = Math.Floor(stunden_gesamt2 / 24 / 7)
            monate = Math.Floor(stunden_gesamt2 / 24 / 30.4375)
            If RadioButton3.Checked = True Then
                stunden_gesamt2 -= Math.Floor(wochen * 24 * 7)
            Else 'If RadioButton2.Checked = True Then
                stunden_gesamt2 -= Math.Floor(monate * 24 * 30.4375)
            End If
            tage = Math.Floor(stunden_gesamt2 / 24)
            'stunden_gesamt2 -= Math.Floor(tage * 24)
        End If
    End Sub

    Private Sub smoking_Deactivate(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Deactivate
        If Me.WindowState = FormWindowState.Minimized Then
            Me.Visible = False
        End If
    End Sub

    Private Sub mach1()
        If IsDate((b_tag.Text) + "." + (b_monat.Text) + "." + (b_jahr.Text) + " " + (b_stunde.Text) + ":" + (b_minute.Text)) Then
            set_time(New Date(CInt(b_jahr.Text), CInt(b_monat.Text), CInt(b_tag.Text), CInt(b_stunde.Text), CInt(b_minute.Text), 0))
        ElseIf Not b_tag.Text = "" And Not b_monat.Text = "" And Not b_jahr.Text = "" And Not b_stunde.Text = "" And Not b_minute.Text = "" Then
            MsgBox("Es wurde ein falsches Datum oder eine Falsche Uhrzeit eingegeben.")
        End If
        make_texts()
    End Sub

    Private Sub calcall()
        mach1()
        make_sparzeit()
        make_kosten()
    End Sub




    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs)
        make_sparzeit()
    End Sub


    Private Sub make_kosten()
        NotifyIcon1.BalloonTipIcon = ToolTipIcon.Info
        NotifyIcon1.BalloonTipText = Label1.Text
        NotifyIcon1.BalloonTipTitle = "Nichtraucher"
        If IsNumeric(b_Tabakwoche.Text) Then
            b_tabbaksumme.Text = Math.Ceiling(CDbl(b_Tabakwoche.Text) / 7 / 24 * stunden_gesamt).ToString
            If IsNumeric(b_nichtraucherprozent.Text) Then
                b_a.Text = Math.Ceiling(CDbl(b_tabbaksumme.Text) * 0.6 * CDbl(b_nichtraucherprozent.Text) / 100)
            End If
        End If
        If IsNumeric(b_preis_pro_Schachtel.Text) And IsNumeric(b_schachteln_pro_tag.Text) Then
            b_schachtelsumme.Text = Math.Ceiling(CDbl(b_preis_pro_Schachtel.Text) * CDbl(b_schachteln_pro_tag.Text) / 24 * stunden_gesamt).ToString
            If IsNumeric(b_nichtraucherprozent.Text) Then
                b_b.Text = Math.Ceiling(CDbl(b_schachtelsumme.Text) * 0.75 * CDbl(b_nichtraucherprozent.Text) / 100)
            End If
        End If
        NotifyIcon1.BalloonTipText += Chr(13) + b_tabbaksumme.Text + "€ gespart (Tabbak) oder"
        NotifyIcon1.BalloonTipText += Chr(13) + b_schachtelsumme.Text + "€ gespart (Schachteln)"
        If IsNumeric(b_nichtraucherprozent.Text) Then
            b_c.Text = CStr(Math.Ceiling(stunden_gesamt / (60 * 365.25 * 24) * 42000 * CDbl(b_nichtraucherprozent.Text) / 100))
        End If
    End Sub



    Private Sub Button2_Click(ByVal sender As System.Object, ByVal e As System.EventArgs)
        make_kosten()
    End Sub
    Dim bb As Boolean = False

    Private Sub NotifyIcon1_BalloonTipClicked(ByVal sender As Object, ByVal e As System.EventArgs) Handles NotifyIcon1.BalloonTipClicked
        bb = False
    End Sub

    Private Sub NotifyIcon1_BalloonTipClosed(ByVal sender As Object, ByVal e As System.EventArgs) Handles NotifyIcon1.BalloonTipClosed
        bb = False
    End Sub
    Private Sub NotifyIcon1_BalloonTipShown(ByVal sender As Object, ByVal e As System.EventArgs) Handles NotifyIcon1.BalloonTipShown
        bb = True
    End Sub

    Private Sub NotifyIcon1_DoubleClick(ByVal sender As Object, ByVal e As System.EventArgs) Handles NotifyIcon1.DoubleClick

    End Sub

    Private Sub NotifyIcon1_MouseClick(ByVal sender As System.Object, ByVal e As System.Windows.Forms.MouseEventArgs) Handles NotifyIcon1.MouseClick
        If Me.Visible = False Then
            Me.Visible = True
            Me.WindowState = FormWindowState.Normal
            Me.Visible = True
        Else
            Me.Visible = False
        End If
    End Sub

    Public Sub New()

        ' Dieser Aufruf ist für den Windows Form-Designer erforderlich.
        InitializeComponent()

        ' Fügen Sie Initialisierungen nach dem InitializeComponent()-Aufruf hinzu.
        If Not My.Computer.FileSystem.DirectoryExists(xml_dir) Then
            Try
                My.Computer.FileSystem.CreateDirectory(xml_dir)
            Catch ex As Exception
                Throw ex
                End
            End Try
        End If
        If My.Computer.FileSystem.FileExists(xml_dir + "zigarettenmesser.xml") Then
            doc.Load(xml_dir + "zigarettenmesser.xml")
            b_jahr.Text = doc.Item("zigarettenmesser").Item("datum").Attributes("jahr").Value
            b_monat.Text = doc.Item("zigarettenmesser").Item("datum").Attributes("monat").Value
            b_tag.Text = doc.Item("zigarettenmesser").Item("datum").Attributes("tag").Value
            b_stunde.Text = doc.Item("zigarettenmesser").Item("uhrzeit").Attributes("stunde").Value
            b_minute.Text = doc.Item("zigarettenmesser").Item("uhrzeit").Attributes("minute").Value
            b_schachteln_pro_tag.Text = doc.Item("zigarettenmesser").Item("rauchdaten").Attributes("schachteln").Value
            b_preis_pro_Schachtel.Text = doc.Item("zigarettenmesser").Item("rauchdaten").Attributes("schachtelpreis").Value
            b_Tabakwoche.Text = doc.Item("zigarettenmesser").Item("rauchdaten").Attributes("tabbakpreis").Value
            b_stueck.Text = doc.Item("zigarettenmesser").Item("zigarettendauer").Attributes("anzahl").Value
            b_rauchdauer.Text = doc.Item("zigarettenmesser").Item("zigarettendauer").Attributes("pro").Value
            If doc.Item("zigarettenmesser").Item("ausgabevariante").Attributes("monat").Value = "True" Then
                RadioButton2.Checked = True
            Else
                RadioButton3.Checked = True
            End If
            If IsDate((b_tag.Text) + "." + (b_monat.Text) + "." + (b_jahr.Text) + " " + (b_stunde.Text) + ":" + (b_minute.Text)) Then
                set_time(New Date(CInt(b_jahr.Text), CInt(b_monat.Text), CInt(b_tag.Text), CInt(b_stunde.Text), CInt(b_minute.Text), 0))
            End If
        Else
            set_time(New Date(2008, 6, 5, 20, 0, 0))
        End If
        make_texts()
        make_sparzeit()
        make_kosten()
        Timer1.Start()
    End Sub

    Private Sub LinkLabel1_LinkClicked(ByVal sender As System.Object, ByVal e As System.Windows.Forms.LinkLabelLinkClickedEventArgs) Handles LinkLabel1.LinkClicked
        'Dim browserwahl As Object = My.Computer.Registry.GetValue("HKEY_CLASSES_ROOT\.html", "", Nothing)
        'Dim browserstart As Object = My.Computer.Registry.GetValue("HKEY_CLASSES_ROOT\" + CStr(browserwahl) + "\shell\open\command", "", Nothing)
        'Dim sbrowserstart As String = CStr(browserstart)
        'Dim i As Int16 = 1
        'While i < sbrowserstart.Length
        '    If sbrowserstart(i) = """" Then
        '        sbrowserstart = sbrowserstart.Substring(1, i - 1)
        '        i = sbrowserstart.Length
        '    End If
        '    i += 1
        'End While
        'MsgBox("The value is " & sbrowserstart)
        'Process.Start(sbrowserstart, "http://www.spiegel.de/wissenschaft/mensch/0,1518,533257,00.html")
        Process.Start("http://www.spiegel.de/wissenschaft/mensch/0,1518,533257,00.html")
    End Sub

    Private Sub RadioButton2_CheckedChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles RadioButton2.CheckedChanged
        mach1()
    End Sub
    Private Sub RadioButton3_CheckedChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles RadioButton3.CheckedChanged
        mach1()
    End Sub

    Private Sub calcall2(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs)
        If e.KeyCode >= 48 And e.KeyCode <= 59 Or e.KeyCode = Keys.Back Or e.KeyCode = Keys.Delete Or e.KeyCode = Keys.Return Then
            sender.readonly = False
        Else
            sender.readonly = True
        End If
    End Sub
    Private Sub calcall3(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs)
        If e.KeyCode >= 48 And e.KeyCode <= 59 Or e.KeyCode = Keys.Back Or e.KeyCode = Keys.Delete Or e.KeyCode = Keys.Return Or e.KeyCode = Keys.Oemcomma Then
            sender.readonly = False
        Else
            sender.readonly = True
        End If
        If e.KeyCode = Keys.Oemcomma Then
            For i As Int16 = 0 To sender.text.length - 1
                If sender.text(i) = "," Then
                    sender.readonly = True
                End If
            Next
        End If
    End Sub

    Private Sub b_Tabakwoche_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_Tabakwoche.KeyDown
        calcall3(sender, e)
    End Sub

    Private Sub b_schachtelsumme_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_schachtelsumme.KeyDown
        calcall2(sender, e)
    End Sub

    Private Sub b_preis_pro_Schachtel_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_preis_pro_Schachtel.KeyDown
        calcall3(sender, e)
    End Sub

    Private Sub b_rauchdauer_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_rauchdauer.KeyDown
        calcall2(sender, e)
    End Sub

    Private Sub b_stueck_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_stueck.KeyDown
        calcall2(sender, e)
    End Sub

    Private Sub b_nichtraucherprozent_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_nichtraucherprozent.KeyDown
        nichtraucherprozent_gewesen = b_nichtraucherprozent.Text
        calcall3(sender, e)
    End Sub

    Private Sub b_jahr_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_jahr.KeyDown
        calcall2(sender, e)
    End Sub

    Private Sub b_minute_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_minute.KeyDown
        calcall2(sender, e)
    End Sub

    Private Sub b_monat_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_monat.KeyDown
        calcall2(sender, e)
    End Sub

    Private Sub b_stunde_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_stunde.KeyDown
        calcall2(sender, e)
    End Sub

    Private Sub b_tag_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_tag.KeyDown
        calcall2(sender, e)
    End Sub

    Private Sub b_schachteln_pro_tag_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_schachteln_pro_tag.KeyDown
        calcall3(sender, e)
    End Sub


    Private Sub b_Tabakwoche_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_Tabakwoche.KeyUp
        calcall()
    End Sub

    Private Sub b_schachtelsumme_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_schachtelsumme.KeyUp
        calcall()
    End Sub

    Private Sub b_preis_pro_Schachtel_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_preis_pro_Schachtel.KeyUp
        calcall()
    End Sub

    Private Sub b_rauchdauer_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_rauchdauer.KeyUp
        calcall()
    End Sub

    Private Sub b_stueck_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_stueck.KeyUp
        calcall()
    End Sub

    Private Sub b_nichtraucherprozent_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_nichtraucherprozent.KeyUp
        If IsNumeric(b_nichtraucherprozent.Text) Then
            If CDbl(b_nichtraucherprozent.Text) > 100 Then
                b_nichtraucherprozent.Text = nichtraucherprozent_gewesen
            End If
            If CDbl(b_nichtraucherprozent.Text) > 100 Then
                b_nichtraucherprozent.Text = 100
            End If
        End If
        calcall()
    End Sub

    Private Sub b_jahr_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_jahr.KeyUp
        If IsNumeric(sender.Text) Then
            If CDbl(sender.Text) < 0 Then
                sender.Text = 0
            End If
        End If
        calcall()
    End Sub

    Private Sub b_minute_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_minute.KeyUp
        If IsNumeric(sender.Text) Then
            If CDbl(sender.Text) > 60 Then
                sender.Text = "59"
            End If
        End If
        calcall()
    End Sub

    Private Sub b_monat_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_monat.KeyUp
        If IsNumeric(sender.Text) Then
            If CDbl(sender.Text) > 12 Then
                sender.Text = "12"
            End If
        End If
        calcall()
    End Sub

    Private Sub b_stunde_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_stunde.KeyUp
        If IsNumeric(sender.Text) Then
            If CDbl(sender.Text) > 23 Then
                sender.Text = "23"
            End If
        End If
        calcall()
    End Sub

    Private Sub b_tag_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_tag.KeyUp
        If IsNumeric(sender.Text) Then
            If CDbl(sender.Text) > 31 Then
                sender.Text = 30
            End If
        End If
        calcall()
    End Sub
    Private Sub b_schachteln_pro_tag_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles b_schachteln_pro_tag.KeyUp
        calcall()
    End Sub

    Private Sub Button1_Click_1(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        Me.Dispose()
    End Sub

    Private Sub rauchen_beendet_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles rauchen_beendet.Click
        Me.WindowState = FormWindowState.Minimized
    End Sub

    Private Sub NotifyIcon1_MouseMove(ByVal sender As Object, ByVal e As System.Windows.Forms.MouseEventArgs) Handles NotifyIcon1.MouseMove
        If Not bb Then NotifyIcon1.ShowBalloonTip(5000)
    End Sub

    Private Sub Timer1_Tick(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Timer1.Tick
        calcall()
    End Sub

    Protected Overrides Sub Finalize()
        MyBase.Finalize()
    End Sub

   
    Private Sub GroupBox1_MouseHover(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox1.MouseEnter
        sender.backcolor = Color.Beige
    End Sub

    Private Sub GroupBox1_MouseLeave(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox1.MouseLeave
        sender.backcolor = Color.LightGoldenrodYellow
    End Sub

    Private Sub GroupBox2_MouseHover(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox2.MouseEnter
        sender.backcolor = Color.Beige
    End Sub

    Private Sub GroupBox2_MouseLeave(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox2.MouseLeave
        sender.backcolor = Color.LightGoldenrodYellow
    End Sub

    Private Sub GroupBox3_MouseHover(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox3.MouseEnter
        sender.backcolor = Color.Beige
    End Sub

    Private Sub GroupBox3_MouseLeave(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox3.MouseLeave
        sender.backcolor = Color.LightGoldenrodYellow
    End Sub
    Private Sub GroupBox4_MouseHover(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox4.MouseEnter
        sender.backcolor = Color.Beige
    End Sub

    Private Sub GroupBox4_MouseLeave(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox4.MouseLeave
        sender.backcolor = Color.LightGoldenrodYellow
    End Sub
    Private Sub GroupBox5_MouseHover(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox5.MouseEnter
        sender.backcolor = Color.Beige
    End Sub

    Private Sub GroupBox5_MouseLeave(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox5.MouseLeave
        sender.backcolor = Color.LightGoldenrodYellow
    End Sub
    Private Sub GroupBox6_MouseHover(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox6.MouseEnter
        sender.backcolor = Color.Beige
    End Sub

    Private Sub GroupBox6_MouseLeave(ByVal sender As Object, ByVal e As System.EventArgs) Handles GroupBox6.MouseLeave
        sender.backcolor = Color.LightGoldenrodYellow
    End Sub

    Private Sub zigarettenmesser_MouseHover(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.MouseEnter
        sender.backcolor = Color.LightGoldenrodYellow
    End Sub

    Private Sub zigarettenmesser_MouseLeave(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.MouseLeave
        sender.backcolor = Color.Beige
    End Sub

    Private Sub NotifyIcon1_MouseDoubleClick(ByVal sender As System.Object, ByVal e As System.Windows.Forms.MouseEventArgs) Handles NotifyIcon1.MouseDoubleClick

    End Sub
End Class

