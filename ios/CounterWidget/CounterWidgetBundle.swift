//
//  CounterWidgetBundle.swift
//  CounterWidget
//
//  Created by Sani Mridha on 14/3/25.
//

import WidgetKit
import SwiftUI

@main
struct CounterWidgetBundle: WidgetBundle {
    var body: some Widget {
        CounterWidget()
        CounterWidgetLiveActivity()
    }
}
