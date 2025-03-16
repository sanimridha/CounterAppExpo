import android.appwidget.AppWidgetProvider
import android.appwidget.AppWidgetManager
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import android.app.PendingIntent
import com.sanimridha.CounterApp.R

class CounterWidget : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    private fun updateAppWidget(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetId: Int
    ) {
        val views = RemoteViews(context.packageName, R.layout.widget_counter)

        val prefs = context.getSharedPreferences("widget_prefs", Context.MODE_PRIVATE)
        val count = prefs.getInt("count", 0)

        views.setTextViewText(R.id.widget_count, count.toString())

        val incIntent = Intent(context, CounterWidget::class.java).apply {
            action = "INCREMENT"
        }
        val decIntent = Intent(context, CounterWidget::class.java).apply {
            action = "DECREMENT"
        }

        views.setOnClickPendingIntent(R.id.widget_inc,
            PendingIntent.getBroadcast(context, 0, incIntent, PendingIntent.FLAG_IMMUTABLE))
        views.setOnClickPendingIntent(R.id.widget_dec,
            PendingIntent.getBroadcast(context, 1, decIntent, PendingIntent.FLAG_IMMUTABLE))

        appWidgetManager.updateAppWidget(appWidgetId, views)
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        val prefs = context.getSharedPreferences("widget_prefs", Context.MODE_PRIVATE)
        var count = prefs.getInt("count", 0)

        when (intent.action) {
            "INCREMENT" -> count++
            "DECREMENT" -> count--
        }

        prefs.edit().putInt("count", count).apply()
        updateWidget(context)
    }

    private fun updateWidget(context: Context) {
        val appWidgetManager = AppWidgetManager.getInstance(context)
        val ids = appWidgetManager.getAppWidgetIds(
            ComponentName(context, CounterWidget::class.java)
        )
        onUpdate(context, appWidgetManager, ids)
    }
}