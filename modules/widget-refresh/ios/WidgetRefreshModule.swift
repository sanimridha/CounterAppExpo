import ExpoModulesCore
import WidgetKit

public class WidgetRefreshModule: Module {
  public func definition() -> ModuleDefinition {
    Name("WidgetRefresh")

    AsyncFunction("reloadAllTimelines") {
      if #available(iOS 14.0, *) {
        WidgetCenter.shared.reloadAllTimelines()
      }
    }
  }
}